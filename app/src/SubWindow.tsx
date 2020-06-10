import React from "react";
import ReactDOM from "react-dom";

type SubWindowProps = {
  onClose: ()=>void
  title?: string
}

class SubWindow extends React.Component<SubWindowProps> {
    nativeWindowObject:any;

    componentWillMount(){
      this.nativeWindowObject = window.open('');
       //@ts-ignore
       this.nativeWindowObject.onbeforeunload = (e) => {
        e.returnValue = false;  // this will *prevent* the closing no matter what value is passed
        e.preventDefault();
        (typeof this.props.onClose === "function") && this.props.onClose();
      };
    }

    componentWillUnmount(){
      //@ts-ignore
      this.nativeWindowObject.onbeforeunload = null;
      //@ts-ignore
      this.nativeWindowObject.close();
    }

    render() {
      return this.nativeWindowObject ? ReactDOM.createPortal(this.props.children, this.nativeWindowObject.document.body) : null;
    }
}

export default SubWindow;