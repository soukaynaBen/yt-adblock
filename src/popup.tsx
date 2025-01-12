
import "~style.css"
import Logo from "react:~../assets/logo.svg"


function IndexPopup() {
  return (
    <div className="plasmo-flex plasmo-flex-col  plasmo-items-center plasmo-justify-center plasmo-h-52 plasmo-w-72 plasmo-p-8 plasmo-space-y-4">
     <Logo  width={128}  className="plasmo-block" />

       <h1 className=" plasmo-font-medium plasmo-capitalize plasmo-text-xl ">Youtube ads blocker</h1>
      
    </div>
  )
}

export default IndexPopup


