import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalComponent = ({ modalState, handleModal, modalData, imgHeader }) => {
  console.log(modalData);
  return (
    <div key={modalData[0].id}>
      <Modal
        open={modalState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalData[0].name}
          </Typography>
          <Typography className="" id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="m-auto" style={{ width: "cover" }}>
              <img
                className="mainImg"
                src={`${imgHeader}${modalData[0].profile_path}`}
                alt=""
              />
            </div>
            <div className="d-flex m-3">
              {modalData[0].known_for.map((posterImg) => {
                return (
                  <div>
                    <img
                      className="m-2 poster"
                      src={`${imgHeader}${posterImg.poster_path}`}
                      alt=""
                    />
                    <p>{posterImg.title}</p>
                  </div>
                );
              })}
            </div>
          </Typography>
          <Button onClick={handleModal}>Close modal</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
