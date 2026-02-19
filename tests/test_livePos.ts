import { ModCode } from '../src/enums';
import VVSClient from '../src/index';

const vvs = new VVSClient();

function test() {
    console.log('Testing VVSClient.LivePositions...');

    vvs.LivePositions.getLivePositions(48.775846, 9.182932, 48.785846, 9.192932).then(res => {
        console.log("Live Positions:");
        console.log(res);
    });

    vvs.LivePositions.getPinsNearby(48.775846, 9.182932, 500).then(res => {
        console.log("Pins Nearby:");
        console.log(res);
    });
}

test();