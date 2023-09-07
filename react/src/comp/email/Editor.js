import ReactQuill from "react-quill";
const Editor = () => {
 const modules = {
   toolbar: {
     container: [
       ["image"],
       [{ header: [1, 2, 3, 4, 5, false] }],
       ["bold", "underline"],
     ],
   },
 };
 return (
   <>
     <ReactQuill
       style={{ width: "400px", height: "300px" }}
       modules={modules}
     />
   </>
 );
}
export default Editor;