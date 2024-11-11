import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CarInfo = ({ register, errors, item, index }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mb-4">
      {item.type === "file" ? (
        <>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            endIcon={<CloudUploadIcon />}
            sx={{
              backgroundColor: "#219ebc",
            }}
          >
            Upload Car Image
            <VisuallyHiddenInput
              type="file"
              {...register(`cars.${index}.${item.name}`, { required: item.required })}
              onChange={(e) => {
                register(`cars.${index}.${item.name}`).onChange(e);
                handleFileChange(e);
              }}
            />
          </Button>
          {selectedFile && <img src={selectedFile} alt="Selected Car" className="mt-2 w-1/2" />}
        </>
      ) : (
        <TextField
          {...register(`cars.${index}.${item.name}`, {
            required: item.required && `${item.label} is Required`,
          })}
          type={item.type}
          sx={{
            "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
              fontWeight: "600",
              opacity: 0.8,
            },
          }}
          fullWidth
          id="outlined-basic"
          label={item.label}
          error={errors?.cars?.[index]?.[item.name] ? true : false}
          variant="outlined"
        />
      )}
    </div>
  );
};

export default CarInfo;
