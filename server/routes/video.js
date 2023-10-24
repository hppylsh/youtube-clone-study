const express = require('express');
const router = express.Router();
const {Video} = require("../models/Video");

const {auth} = require("../middleware/auth")
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    // mime type 체크하여 원하는 타입만 필터링
    if (file.mimetype == 'video/mp4') {
        cb(null, true);
    } else {
        return cb(new Error('only mp4 is allowed'), false);
    }

}

const upload = multer({storage: storage, fileFilter: fileFilter}).single("file");
//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    //비디오 서버에 저장
    upload(req, res, err => {
        if (err) {
            return res.json({success: false, err})
        }

        return res.json({success: true, url: res.req.file.path, fileName: res.req.file.filename});
    })
})

router.get('/getVideos', (req, res) => {
    //비디오를 DB에서 가져와서 클라이언트에 보낸다
    Video.find()
        .populate("writer")
        .exec((err, videos) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true, videos})
        });
});
router.post('/uploadVideo', (req, res) => {
    //비디오 정보를 저장한다.
    const video = new Video(req.body);
    video.save((err, doc) => {
        if (err) return res.json({success: false, err})
        res.status(200).json({success: true})
    });
});

router.post('/thumbnail', (req, res) => {
    let thumbsFilePath = "";
    let fileDuration = "";

    ffmpeg.setFfmpegPath("C:\\ProgramData\\chocolatey\\lib\\ffmpeg\\tools\\ffmpeg\\bin\\ffmpeg.exe");

    // 미디어 러닝타임 가져오기
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    });

    // 썸네일 생성
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            // %b input basename ( filename w/o extension )
            filename: 'thumbnail-%b.png'
        });

});


module.exports = router;