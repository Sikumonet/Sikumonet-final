import {useState} from "react";
import './Upload.css'
import {MdCloudUpload, MdDelete} from "react-icons/md";
import {AiFillFileImage} from "react-icons/ai";

function Upload(){
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("No Selected File")
    return (
        <main>
            <form action=""
            onClick={() => document.querySelector(".input-field").click()}
            >
                <input type="file" accept='image/*' className='input-field' hidden
                onChange={({target: {files}}) => {
                files[0] && setFileName(files[0].name)
                    if(files){
                        setImage(URL.createObjectURL((files[0])))
                    }
                }
                }
                />
                    {image ?
                    <img src={image} width={150} height={150} alt={fileName}/>
                    :
                   <>
                       <MdCloudUpload color='#1475cf' size={60} />
                       <p>Upload a Summary</p>
                   </>
                       }

            </form>
            <section className='uploaded-row'>
                <AiFillFileImage color='#1475cf'/>
                <span className='upload-content'>
                    {fileName} -
                    <MdDelete
                    onClick={() => {
                    setFileName("No Selected Summary")
                    setImage(null)
                    }
                    }
                    />
                </span>
            </section>

        </main>

    )
}
export default Upload
