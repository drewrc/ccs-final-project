import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDumbbell } from "@fortawesome/free-solid-svg-icons"

function Footer () {
return (
    <>
    <div className="fixed-bottom footer">FitBuddies 2023    <FontAwesomeIcon 
              style={{ marginRight: '20px'}}
              icon={faDumbbell} /></div>
    </>
)
}
export default Footer


