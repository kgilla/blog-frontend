import React, {useState, useEffect}from 'react';

const Flash = (props) => {
  let [message, setMessage] = useState(props.message);

  useEffect(() => {
    const removeMessage = () => {
      setTimeout(() => setMessage(""), 4000)
    } 
    removeMessage()
  }, [])
  return (
    <div className="flash-box">
      <h2 className="flash-message">{message}</h2>
    </div>
  )

}

export default Flash