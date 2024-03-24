import { useRef, useState } from 'react'
import QRCode from 'react-qr-code'
import * as htmlToImage from 'html-to-image';

const Card = () => {
    const [qr, setQr] = useState("");
    const qrCodeRef = useRef(null);

    const handleChange = (event) => {
        setQr(event.target.value);
    }

    const downloadQR = () => {
        if (qrCodeRef.current) {
            htmlToImage.toPng(qrCodeRef.current)
                .then((dataUrl) => {
                    const downloadLink = document.createElement('a');
                    downloadLink.href = dataUrl;
                    downloadLink.download = `${qr}.png`;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                })
                .catch((error) => {
                    console.error('Error generating QR code image: ', error);
                });
        }
    }

    return (
        <div className='w-96 '>
            <div className="items-center text-center">
                <h2 className="flex justify-center my-5 text-4xl font-blod" >Generate Your QR Code</h2>
                <div className={qr ? "card" : "hidden"} ref={qrCodeRef}>
                    <QRCode value={qr} className='w-90 mx-auto' />
                </div>
                <div className="from">
                    <form className='mt-5'>
                        <input type="text" name="prompt" placeholder="Enter URL Or text" className="input input-bordered input-primary w-full max-w-xs " onChange={handleChange} value={qr} />
                    </form>
                </div>
                <div className="card-actions my-5 flex items-end justify-center">
                    {
                        qr ? <button className="btn btn-primary btn-outline" onClick={downloadQR}>Download</button> : <button className="btn btn-primary btn-outline" disabled>Download</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Card
