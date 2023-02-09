import { useState } from 'react';
import axios from 'axios';
// import './FileUpload.css';
const FileUpload = ({ contract, wallet, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('No file selected');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const resFile = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,
          headers: {
            pinata_api_key: `Enter Your Key`,
            pinata_secret_api_key: `Enter Your Secret Key`,
            'Content-Type': 'multipart/form-data',
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        //const signer = contract.connect(provider.getSigner());
        const signer = contract.connect(provider.getSigner());
        signer.add(wallet, ImgHash);
      } catch (e) {
        alert('Unable to upload image to Pinata');
      }
    }
    alert('Successfully Image Uploaded');
    setFileName('No image selected');
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className='row '>
      <form className='form border col-6 mx-auto rounded p-5 numorph' onSubmit={handleSubmit}>
        <label htmlFor='uploadFile' className='choose'>
          Choose Image
        </label>
        <br />
        <input disabled={!wallet} type='file' id='uploadFile' name='data' onChange={retrieveFile} />
        <br />

        <span className='textArea d-block my-2'>Slected Image: {fileName}</span>
        <br />

        <button type='submit' className='upload btn btn-primary' disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};
export default FileUpload;
