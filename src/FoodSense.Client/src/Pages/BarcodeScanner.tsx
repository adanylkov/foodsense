import React, { useEffect, useRef, useState } from 'react'
// @ts-ignore
import Scanner from '../Components/Scanner'
import Quagga from '@ericblade/quagga2'
import { Button, Center, Container, Flex, Text } from '@mantine/core';

interface BarcodeScannerProps {
    onDetected: (result: string) => void;
}

export const BarcodeScanner = (props: BarcodeScannerProps) => {
    const [scanning, setScanning] = useState(false); // toggleable state for "should render scanner"
    const [cameraId, setCameraId] = useState(null); // id of the active camera device
    const [cameraError, setCameraError] = useState(null); // error message from failing to access the camera
    const [cameras, setCameras] = useState(Array<MediaDeviceInfo>); // list of available cameras
    const [results, setResults] = useState(Array<string>); // list of scanned results
    const scannerRef = useRef(null); // reference to the scanner element in the DOM

    // at start, we need to get a list of the available cameras.  We can do that with Quagga.CameraAccess.enumerateVideoDevices.
    // HOWEVER, Android will not allow enumeration to occur unless the user has granted camera permissions to the app/page.
    // AS WELL, Android will not ask for permission until you actually try to USE the camera, just enumerating the devices is not enough to trigger the permission prompt.
    // THEREFORE, if we're going to be running in Android, we need to first call Quagga.CameraAccess.request() to trigger the permission prompt.
    // AND THEN, we need to call Quagga.CameraAccess.release() to release the camera so that it can be used by the scanner.
    // AND FINALLY, we can call Quagga.CameraAccess.enumerateVideoDevices() to get the list of cameras.

    // Normally, I would place this in an application level "initialization" event, but for this demo, I'm just going to put it in a useEffect() hook in the App component.

    interface CodeResult {
        code: string;
        format: string;
        start: number;
        end: number;
        codeset: number;
        startInfo: CodeInfo;
        decodedCodes: CodeInfo[];
        endInfo: CodeInfo;
        direction: number;
    }

    interface CodeInfo {
        error: number;
        code: number;
        start: number;
        end: number;
    }

    interface Line {
        x: number;
        y: number;
    }

    interface Box {
        x: number;
        y: number;
    }

    interface Data {
        codeResult: CodeResult;
        line: Line[];
        angle: number;
        pattern: number[];
        box: Box[];
        boxes: Box[][];
    }

    useEffect(() => {
        const enableCamera = async () => {
            await Quagga.CameraAccess.request(null, {});
        };
        const disableCamera = async () => {
            await Quagga.CameraAccess.release();
        };
        const enumerateCameras = async () => {
            const cameras = await Quagga.CameraAccess.enumerateVideoDevices();
            console.log('Cameras Detected: ', cameras);
            return cameras;
        };
        enableCamera()
            .then(disableCamera)
            .then(enumerateCameras)
            .then((cameras) => setCameras(cameras))
            .catch((err) => setCameraError(err));
        return () => {
            const cleanup = async () => {
                await disableCamera();
            };
            cleanup();
        }
    }, []);


    return (
        <Container ref={scannerRef} style={{ position: 'relative', height: 480 }} onClick={() => setScanning(true)}>
            <video style={{ position: 'absolute', border: '3px solid red', left: '0px', top: '0px', height: 480 }} />
            <canvas className="drawingBuffer" style={{
                position: 'absolute',
                height: '480px',
                top: '0px',
                left: '0px',
                border: '5px solid green'
            }} />
            {scanning ? <Scanner scannerRef={scannerRef} cameraId={cameraId} onDetected={props.onDetected} /> : null}
        </Container>
    );
};