// src/components/BarcodeScanner.jsx
import React, { useEffect } from 'react';
import Quagga from 'quagga';

function BarcodeScanner({ onDetected }) {
    useEffect(() => {
        Quagga.init({
            inputStream: {
                type: 'LiveStream',
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: 'environment',
                },
            },
            decoder: {
                readers: ['code_128_reader'],
            },
        }, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            Quagga.start();
        });

        Quagga.onDetected((data) => {
            onDetected(data.codeResult.code);
            Quagga.stop();
        });

        return () => {
            Quagga.stop();
        };
    }, [onDetected]);

    return <div id="interactive" className="viewport" />;
}

export default BarcodeScanner;
