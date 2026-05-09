# QA final

Result: PASS

| Check | Result | Detail |
|---|---|---|
| project.json schema | PASS |  |
| video review complete | PASS | factory:review-video must pass before final QA |
| video review report exists | PASS | projects/002-claude-managed-agents/review/video-review/video-review.md |
| render exists | PASS | projects/002-claude-managed-agents/renders/final.mp4 |
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
        "duration": "333.952000"
    }
}
 |
