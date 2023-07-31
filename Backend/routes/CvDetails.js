const express = require("express");
const router = express.Router();
const { CvDetails } = require("../models");
const multer = require("multer");
const path = require("path");
const { validateToken } = require("../middlewares/AuthMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "CVImages");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only jpg, jpeg, pdf, and docx files are allowed."
        )
      );
    }
  },
});

router.post("/", upload.single("cvImage"), async (req, res) => {
  try {
    const { name, position, status } = req.body;

    const cvImage = req.file ? req.file.path : null;

    const newCV = await CvDetails.create({
      name: name,
      cvImage: cvImage,
      status: status,
    });

    res.status(201).json({ message: "CV sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "CV sending failed" });
  }
});

router.get("/listCV-inprogress",validateToken, async (req, res) => {
  try {
    const listOfCv = await CvDetails.findAll({
      where: {
        status: "Inprogress",
      },
    });
    res.json(listOfCv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving cv" });
  }
});

router.get("/listCV-approved",validateToken, async (req, res) => {
  try {
    const listOfCv = await CvDetails.findAll({
      where: {
        status: "Approved",
      },
    });
    res.json(listOfCv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving cv" });
  }
});

router.get("/each-inprogress-cv/:cvId", async (req, res) => {
  try {
    const cvId = req.params.cvId;
    const cv = await CvDetails.findByPk(cvId, {
      where: {
        status: "Inprogress",
      },
      attributes: ["cvImage"],
    });

    if (!cv) {
      return res.status(404).json({ error: "CV not found or not Inprogress" });
    }

    res.sendFile(cv.cvImage, { root: "./" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the CV" });
  }
});

router.post("/status-approved/:cvId", async (req, res) => {
  try {
    const cvId = req.params.cvId;
    const cv = await CvDetails.findByPk(cvId);

    if (!cv) {
      return res.status(404).json({ error: "CV not found" });
    }

    cv.status = "Approved";
    await cv.save();

    res.json({ message: "CV approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "CV approval failed" });
  }
});

router.get("/each-approved-cv/:cvId", async (req, res) => {
  try {
    const cvId = req.params.cvId;
    const cv = await CvDetails.findByPk(cvId, {
      where: {
        status: "Approved",
      },
      attributes: ["cvImage"],
    });

    if (!cv) {
      return res.status(404).json({ error: "CV not found or not Approved" });
    }

    res.sendFile(cv.cvImage, { root: "./" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the CV" });
  }
});

router.delete("/rejected-cv/:cvId",validateToken, async (req, res) => {
  try {
    const cvId = req.params.cvId;
    await CvDetails.destroy({ where: { cvId } });
    res.json({ message: "CV deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the CV" });
  }
});

module.exports = router;
