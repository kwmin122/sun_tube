# QA final

Result: PASS

| Check | Result | Detail |
|---|---|---|
| project.json schema | PASS |  |
| video review evidence exists | PASS | factory:review-video must create frame evidence before final QA |
| video review report exists | PASS | projects/004-manus-ai-discount/review/video-review/hyperframes-review.md |
| renderer comparison exists | PASS | projects/004-manus-ai-discount/review/video-review/renderer-comparison.md |
| renderer comparison verdict PASS | PASS | PASS |
| selected renderer stated | PASS | hyperframes |
| selected renderer is not none | PASS | hyperframes |
| selected renderer render exists | PASS | projects/004-manus-ai-discount/renders/final-hyperframes.mp4 |
| hyperframes render exists | PASS | projects/004-manus-ai-discount/renders/final-hyperframes.mp4 |
| remotion render or blocker recorded | PASS | Remotion blocked recorded |
| hyperframes review exists | PASS | projects/004-manus-ai-discount/review/video-review/hyperframes-review.md |
| selected hyperframes machine review PASS | PASS | PASS |
| director review exists | PASS | projects/004-manus-ai-discount/review/video-review/director-review.md |
| director review verdict PASS | PASS | PASS |
| director review cites rendered evidence frames | PASS | 18 frame reference(s) |
| director critical findings resolved | PASS | no unresolved critical findings |
| selected renderer frame evidence exists | PASS | 28/28 extracted frame(s) in projects/004-manus-ai-discount/review/video-review/frame-manifest-hyperframes.json |
| selected renderer motion-peak frames exist | PASS | 7/7 motion peak frame(s) |
| synthetic DOM false-positive report clean | PASS | projects/004-manus-ai-discount/review/video-review/synthetic-dom-report-hyperframes.json |
| render exists | PASS | projects/004-manus-ai-discount/renders/final.mp4 |
| final render matches selected renderer | PASS | projects/004-manus-ai-discount/renders/final.mp4 == projects/004-manus-ai-discount/renders/final-hyperframes.mp4 |
| ffprobe | PASS | {
    "programs": [

    ],
    "stream_groups": [

    ],
    "streams": [
        {
            "codec_type": "video",
            "width": 1920,
            "height": 1080,
            "avg_frame_rate": "30/1"
        },
        {
            "codec_type": "audio",
            "avg_frame_rate": "0/0"
        }
    ],
    "format": {
        "duration": "107.554333"
    }
}
 |
