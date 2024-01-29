import { Box } from "../utils/containers";
import { FormGroup, FormInput, ImageInput } from "../utils/form";

const FilesUploadComponent = ({ nameID=null, addFile, handleSubmitImage }) => {

    return (
          <FormGroup nameID='file-upload-form' classes='flex-column' height={null} justify='start' align='center' width='90%' onSubmit={ handleSubmitImage }>
              <ImageInput nameID={ nameID } classes='file-upload-input' addFile={ addFile }/>
              <FormInput nameID='file-upload-form--btn' type='submit' value='Upload Image' classes='mt-1'/>
          </FormGroup>
    );
};

export default FilesUploadComponent;