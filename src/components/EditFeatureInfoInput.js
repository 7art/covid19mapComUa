import React, { useState, useEffect } from "react";

function EditFeatureInfoInput({ dataid, name, propsValue, onChange }) {
  const [value, setValue] = useState("0");
  useEffect(() => {
    setValue(propsValue);
  }, []);
  // console.log(dataid);
  return (
    <td>
      <input
        type="text"
        className="form-control edit"
        data-id={dataid}
        name={name}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e);
        }}
      />
    </td>
  );
}

export default EditFeatureInfoInput;
