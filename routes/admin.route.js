const router = require("express").Router();
const xlsx = require("xlsx");
const User = require("../models/user.model");
const Course = require("../models/course.model");
const Experiment = require("../models/experiment.model");
const path = require("path");

router.get("/upload-faculty-student-details", async (req, res, next) => {
  try {
    res.render("student-faculty-fileupload");
  } catch (err) {
    next(err);
  }
});

router.get("/course-upload", async (req, res, next) => {
  try {
    res.render("course-upload");
  } catch (error) {
    next(error);
  }
});

router.get("/experiment-upload", async (req, res, next) => {
  try {
    res.render("experiment-upload");
  } catch (error) {
    next(error);
  }
});

router.post("/register-faculty-student", async (req, res, next) => {
  try {
    const file = req.files.pFile;
    const fileName = new Date().getTime().toString() + path.extname(file.name);
    const savePath = path.join(
      __dirname,
      "../public",
      "faculty-student-uploads",
      fileName
    );
    if (file.truncated) {
      throw new Error("File size is too big");
    }
    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      await file.mv(savePath);
      let wb = xlsx.readFile(savePath, { sheetRows: 1 });

      const sheetName = wb.SheetNames[0];
      let sheetValue = wb.Sheets[sheetName];

      //reading the headers of excel sheet and storing in columnsArray
      const columnsArray = xlsx.utils.sheet_to_json(sheetValue, {
        header: 1,
      })[0];
      console.log(columnsArray);

      //reading the excel body and we get an array of objects
      wb = xlsx.readFile(savePath);
      sheetValue = wb.Sheets[sheetName];
      let excelData = xlsx.utils.sheet_to_json(sheetValue);

      excelData.forEach(async (obj) => {
        delete obj[`${columnsArray[0]}`];
        obj["username"] = obj[`${columnsArray[1]}`].toLowerCase();
        delete obj[`${columnsArray[1]}`];
        obj["email"] = obj[`${columnsArray[2]}`];
        // delete obj[`${columnsArray[2]}`];
        obj["password"] = obj[`${columnsArray[3]}`];
        // delete obj[`${columnsArray[3]}`];
        obj["roleName"] = obj[`${columnsArray[4]}`];
        delete obj[`${columnsArray[4]}`];
        obj["batchFrom"] = obj[`${columnsArray[5]}`];
        delete obj[`${columnsArray[5]}`];
        obj["batchTo"] = obj[`${columnsArray[6]}`];
        delete obj[`${columnsArray[6]}`];
        obj["className"] = obj[`${columnsArray[7]}`];
        delete obj[`${columnsArray[7]}`];

        console.log(obj);
        obj.username = ("" + obj.username + "").trim();
        obj.email = ("" + obj.email + "").trim();
        obj.password = ("" + obj.password + "").trim();
        obj.roleName = ("" + obj.roleName + "").trim().toUpperCase();
        obj.batchFrom = ("" + obj.batchFrom + "").trim();
        obj.batchTo = ("" + obj.batchTo + "").trim();
        obj.className = ("" + obj.className + "").trim();

        const doesExist = await User.findOne({ email: obj.email });
        if (!doesExist) {
          console.log("hi");
          const user = new User(obj);
          await user.save();
        }
      });
      //   req.flash("success", "Your file is uploaded successfully and users are registered successfully");
      console.log(
        "Your file is uploaded successfully and users are registered successfully"
      );
    } else {
      throw new Error("Only excel sheet(.xlsx) is allowed");
    }
  } catch (error) {
    console.log(error);
    next(error);
    // req.flash("error", `${error}`);
  }
  res.redirect("/");
});

router.post("/course-upload", async (req, res, next) => {
  try {
    const file = req.files.pFile;
    const fileName = new Date().getTime().toString() + path.extname(file.name);
    const savePath = path.join(
      __dirname,
      "../public",
      "faculty-student-uploads",
      fileName
    );
    if (file.truncated) {
      throw new Error("File size is too big");
    }
    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      await file.mv(savePath);
      let wb = xlsx.readFile(savePath, { sheetRows: 1 });

      const sheetName = wb.SheetNames[0];
      let sheetValue = wb.Sheets[sheetName];

      //reading the headers of excel sheet and storing in columnsArray
      const columnsArray = xlsx.utils.sheet_to_json(sheetValue, {
        header: 1,
      })[0];
      console.log(columnsArray);

      //reading the excel body and we get an array of objects
      wb = xlsx.readFile(savePath);
      sheetValue = wb.Sheets[sheetName];
      let excelData = xlsx.utils.sheet_to_json(sheetValue);

      excelData.forEach(async (obj) => {
        obj["batchFrom"] = obj[`${columnsArray[0]}`];
        delete obj[`${columnsArray[0]}`];
        obj["batchTo"] = obj[`${columnsArray[1]}`];
        delete obj[`${columnsArray[1]}`];
        obj["classes"] = obj[`${columnsArray[2]}`].split(",");
        // delete obj[`${columnsArray[2]}`];
        obj["courseCode"] = obj[`${columnsArray[3]}`];
        delete obj[`${columnsArray[3]}`];
        obj["courseName"] = obj[`${columnsArray[4]}`];
        delete obj[`${columnsArray[4]}`];
        obj["attendanceTotalMarks"] = obj[`${columnsArray[5]}`];
        delete obj[`${columnsArray[5]}`];
        obj["ceTotalMarks"] = obj[`${columnsArray[6]}`];
        delete obj[`${columnsArray[6]}`];
        obj["caTotalMarks"] = obj[`${columnsArray[7]}`];
        delete obj[`${columnsArray[7]}`];
        obj["vivaTotalMarks"] = obj[`${columnsArray[8]}`];
        delete obj[`${columnsArray[8]}`];

        obj.courseName = ("" + obj.courseName + "").trim();
        obj.batchFrom = ("" + obj.batchFrom + "").trim();
        obj.batchTo = ("" + obj.batchTo + "").trim();
        obj.courseCode = ("" + obj.courseCode + "").trim();
        obj.attendanceTotalMarks = ("" + obj.attendanceTotalMarks + "").trim();
        obj.ceTotalMarks = ("" + obj.ceTotalMarks + "").trim();
        obj.caTotalMarks = ("" + obj.caTotalMarks + "").trim();
        obj.vivaTotalMarks = ("" + obj.vivaTotalMarks + "").trim();

        console.log(obj);

        const doesExist = await Course.findOne({
          courseCode: obj.courseCode,
        });
        if (!doesExist) {
          const course = new Course(obj);
          await course.save();
        } else {
          await Course.updateOne(
            { courseCode: obj.courseCode },
            {
              courseName: obj.courseName,
              batchFrom: obj.batchFrom,
              batchTo: obj.batchTo,
              classes: obj.classes,
              attendanceTotalMarks: obj.attendanceTotalMarks,
              ceTotalMarks: obj.ceTotalMarks,
              caTotalMarks: obj.caTotalMarks,
              vivaTotalMarks: obj.vivaTotalMarks,
            }
          );
        }
      });
      //   req.flash("success", "Your file is uploaded successfully and users are registered successfully");
      console.log(
        "Your file is uploaded successfully and users are registered successfully"
      );
    } else {
      throw new Error("Only excel sheet(.xlsx) is allowed");
    }
  } catch (error) {
    console.log(error);
    next(error);
    // req.flash("error", `${error}`);
  }
  res.redirect("/");
});

router.post("/experiment-upload", async (req, res, next) => {
  try {
    const file = req.files.pFile;
    const fileName = new Date().getTime().toString() + path.extname(file.name);
    const savePath = path.join(
      __dirname,
      "../public",
      "faculty-student-uploads",
      fileName
    );
    if (file.truncated) {
      throw new Error("File size is too big");
    }
    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      await file.mv(savePath);
      let wb = xlsx.readFile(savePath, { sheetRows: 1 });

      const sheetName = wb.SheetNames[0];
      let sheetValue = wb.Sheets[sheetName];

      // reading the headers of excel sheet and storing in columnsArray
      const columnsArray = xlsx.utils.sheet_to_json(sheetValue, {
        header: 1,
      })[0];
      console.log(columnsArray);

      // reading the excel body and we get an array of objects
      wb = xlsx.readFile(savePath);
      sheetValue = wb.Sheets[sheetName];
      let excelData = xlsx.utils.sheet_to_json(sheetValue);

      let course = [];

      excelData.forEach(async (obj) => {
        course.push(obj[`${columnsArray[0]}`]);
      });
      console.log(course);

      let uniqueCourses = [...new Set(course)];
      console.log(uniqueCourses);

      for (i = 0; i < uniqueCourses.length; i++) {
        let expArray = [];
        excelData.forEach(async (obj) => {
          let exp = {};

          if (uniqueCourses[i] === obj[`${columnsArray[0]}`]) {
            obj["courseCode"] = obj[`${columnsArray[0]}`].trim();
            delete obj[`${columnsArray[0]}`];
            obj["courseName"] = obj[`${columnsArray[1]}`].trim();
            delete obj[`${columnsArray[1]}`];
            exp["experimentNumber"] = obj[`${columnsArray[2]}`];
            delete obj[`${columnsArray[2]}`];
            exp["experimentName"] = obj[`${columnsArray[3]}`];
            delete obj[`${columnsArray[3]}`];
            exp["experimentQuestion"] = obj[`${columnsArray[4]}`];
            delete obj[`${columnsArray[4]}`];

            expArray.push(exp);
            obj["experiments"] = expArray;

            // console.log(obj);

            console.log(obj["courseCode"]);

            const doesExist = await Experiment.find({
              courseCode: `${obj["courseCode"]}`,
            });
            console.log("value of doesExist ", doesExist);
            if (!doesExist) {
              const experiment = new Experiment(obj);
              await experiment.save();
            } else {
              console.log(doesExist.courseName);
              await Experiment.updateOne(
                { courseCode: obj.courseCode },
                {
                  courseName: obj.courseName,
                  experiments: obj.experiments,
                }
              );
            }
          }
        });
      }

      //req.flash("success", "Your file is uploaded successfully and users are registered successfully");
      console.log(
        "Your file is uploaded successfully and experiments are added"
      );
    } else {
      throw new Error("Only excel sheet(.xlsx) is allowed");
    }
  } catch (error) {
    next(error);
  }
  res.redirect("/");
});

module.exports = router;
