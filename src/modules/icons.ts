import axios from "axios";
import { DOMParser, XMLSerializer } from "xmldom";
import { Icon } from "../enums";

export default class VVSClientIcons {
    private cachedIcons?: string;
    private svgDoc?: Document;
    iconUrl: string = "https://www-assets.vvs.de/assets/icons.svg";

    async load(): Promise<void> {
        const res = await axios.get(this.iconUrl, {
            responseType: "text"
        });

        this.cachedIcons = res.data;

        const parser = new DOMParser();
        this.svgDoc = parser.parseFromString(res.data, "image/svg+xml")
    }

    getIcon(icon: Icon): string | undefined {
        if (!this.svgDoc) {
            throw new Error("Icons not loaded.")
        }
        const symbol = this.svgDoc.getElementById(icon);
        if (!symbol)
        {
            console.warn(`Icon with id ${icon} not found.`);
            return undefined;
        }

        const viewBox = symbol.getAttribute("viewBox") || "0 0 100 100";

        let innerSvg = "";
        for (let i = 0; i < symbol.childNodes.length; i++) {
            innerSvg += new XMLSerializer().serializeToString(symbol.childNodes[i]);
        }

        const finalIcon = new DOMParser().parseFromString(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${innerSvg}</svg>`,
            "image/svg+xml"
        ).documentElement;

        return finalIcon
            ? new XMLSerializer().serializeToString(finalIcon)
            : undefined;
    }
}