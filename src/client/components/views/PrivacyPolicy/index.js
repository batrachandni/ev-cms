import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {getAllPagesId, getPageDataById,sendHtmlData,sendImageFile} from '../TheElectricRevolution/action';
import Editor from "../../General/Editor";


class PrivacyAndPolicy extends Component {
  constructor(props) {
    super(props);
    this.state ={
      showModalForImage : false,
      showMessage : '',
     } 
  }
 
async componentDidMount(){
  await this.props.getAllPagesId();
  const pageidofterms = this.props.pagesid.pages["privacy-policy"].id;
  await this.props.getPageDataById(pageidofterms);

 }

 handleSave = async(body,title) => {
   let {imageurl} = this.props;
   let headerImagee  = this.props.headerImage
   let headerImage = imageurl ? imageurl : headerImagee;
   const pageidofterms = this.props.pagesid.pages["privacy-policy"].id;
  await this.props.sendHtmlData(pageidofterms,{body ,title,headerImage });
  await this.handleUploadSuccessfully();
 }
 handleUploadSuccessfully = async() => { 
  if(this.props.statusForContentPages){
   await this.setState({ showModalForImage: true});
   const pageidofterms = this.props.pagesid.pages["privacy-policy"].id;
   await this.props.getPageDataById(pageidofterms);
  }
  else {
    this.setState({
     showMessage : "Fields should not be empty"
    })
  }
 }

 handleCloseModal = () =>{
   this.setState({
    showModalForImage: false
   });
 }

onEditorStateChange = (editorState) => {
  this.setState({
    editorState,
  });
};

handleFile = async(file) =>{
  await this.props.sendImageFile({image:file});
  }
 render() {
  let  showModalForImagee = this.state.showModalForImage;
  let  showMessagee = this.state.showMessage;
   let headerTitle = "Privacy Policy"
    const { body, title, headerImage,pagesid,imageurl} = this.props;
     return (
      <Editor body = {body || undefined} saveData={this.handleSave} 
      isOpen={showModalForImagee}
      showMessagee = {showMessagee}
      headerTitle ={headerTitle}
      handleCloseModal = {this.handleCloseModal}
      headerImage={ imageurl || headerImage}  saveFile = {this.handleFile} title={title} 
      />
    );
  }
}

const mapStateToProps = ({
  AllContentPageReducer,
}) => ({
  pagesid: AllContentPageReducer.pagesid,
  headerImage : AllContentPageReducer.headerImage,
  body : AllContentPageReducer.body,
  title : AllContentPageReducer.title,
  status: AllContentPageReducer.status,
  message: AllContentPageReducer.message,
  imageurl : AllContentPageReducer.imageurl,
  statusForContentPages : AllContentPageReducer.statusForContentPages,

});

const mapDispatchToProps = dispatch => ({
  getAllPagesId: bindActionCreators(getAllPagesId, dispatch),
  getPageDataById: bindActionCreators(getPageDataById, dispatch),
  sendHtmlData : bindActionCreators(sendHtmlData ,dispatch),
  sendImageFile : bindActionCreators(sendImageFile , dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivacyAndPolicy);