import React, { Component } from "react";
import { bindActionCreators } from "redux";
import Modal from "react-modal";
import { connect } from "react-redux";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { convertFromHTML } from "draft-convert";
import {sendImageFileInEditor} from '../../views/TheElectricRevolution/action';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class CommonEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: "",
      content: "",
      selectedFile: null,
      srcimage : '',
      errormessage : '',
     };
}

  componentWillReceiveProps(nextProps) {
    if (nextProps.body !== this.props.body && nextProps.body) {
      const { contentBlocks, entityMap } = htmlToDraft(nextProps.body);
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState,
        title: nextProps.title,
        // content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        content : nextProps.body
      });
    }
  }

  handleSave = async () => {
    let body = this.state.content  || draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    let title = this.state.title;

    this.props.saveData(body, title);
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  };

  handleChangeHtml = e => {
    const {value} = e.target;
    const { contentBlocks, entityMap } = htmlToDraft(value);
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    this.setState({
      content: value,
      editorState: EditorState.createWithContent(contentState)
    });
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({
      title: value
    });
  };

  fileChangedHandler = event => {
    //let data = event.target.files[0];
    //data.type="multipart/form-data; boundary=----WebKitFormBoundaryuZOOX7bwsTCzg9ub";
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    let file  = this.state.selectedFile
 if(file.type.includes("image")){
  this.setState({errormessage : ''});
     this.getBase64(file).then(base64 => {
      this.props.saveFile(base64);
    });
  }else{
  this.setState({errormessage : "Incorrect Format"})
  }

 }

 getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};
uploadImageCallBack = async(file) => {
    const base64 = await this.getBase64(file);
    await this.props.sendImageFileInEditor({image:base64});
    let {imageurleditor} = this.props;
    return new Promise(
      (resolve, reject) => {
        resolve({ data: { link: imageurleditor } });
      }
    );
}

 render() {
   const { editorState, title,content } = this.state;
    const { pagesid, body, headerImage, imageurleditor} = this.props;
   return (
      <React.Fragment>
       <div className="wrapper">
          <span className ="title"><h3>{this.props.headerTitle}</h3></span>
        <span className= "ErrorMessageContainer"><p>{this.props.showMessagee}</p></span> 
          <div className="heading-container-edit-pages innerContainer">
            <h5>Enter the Title:</h5>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={title}
            />
       <div className="file-container">
             <h3 className="btn-Arval_uploads"> Select Background Image </h3>
           <div className ="wrapper-block">
            <input
              type="file"
              name="myfile"
              onChange={this.fileChangedHandler}
            />
            </div>
           <button
              type="submit"
              className="btn btn-primary customButton"
              onClick={this.uploadHandler}
            >
              Upload
            </button>
            
              <span className="imgContainer">
             <img
                src ={headerImage}
                alt ={headerImage}
            />
            </span>
            <span className= "ErrorMessageContainer"><p>{this.state.errormessage}</p></span> 
          </div>
       
          
            </div>
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            toolbar={{
             image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: false } },
            }}
       
          
          />
          <div className="converted-text-container">
            <textarea
              className="demo-content"
              value ={content}
              onChange={this.handleChangeHtml}
              name="content"
            />
          </div>
          <button
            class="btn btn-primary customeditcontentsave"
            onClick={this.handleSave}
          >
            SAVE
          </button>
          <Modal
           isOpen={this.props.isOpen}
           className="modal-assign-tag"
           isScrollable={true}
           contentLabel="Minimal Modal Example"
           >
           <div>
              <span className="heading-container">
                <h3>Content Updated Successfully !</h3>
              </span>
              <button
                className="btn btn-primary buttonsColor"
                onClick={() => {
                  this.props.handleCloseModal();
                }}
              >
                Okay
              </button>
            </div>
            
            </Modal>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  AllContentPageReducer,
}) => ({
  imageurleditor : AllContentPageReducer.imageurleditor,
 });

const mapDispatchToProps = dispatch => ({
  sendImageFileInEditor : bindActionCreators(sendImageFileInEditor , dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonEditor);
