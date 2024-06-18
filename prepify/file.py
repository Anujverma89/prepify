from moviepy.editor import *

# Load the WebM file
video_clip = VideoFileClip("video.mp4")
print(video_clip)
# Extract the audio
audio_clip = video_clip.audio

# Write the audio to a WAV file
audio_clip.write_audiofile("newaudio.wav")

# Close the video and audio clips
video_clip.close()
audio_clip.close()