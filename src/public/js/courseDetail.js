function onYouTubeIframeAPIReady() {
    var player;
    player = new YT.Player('videoPreview', {
      videoId: 'YOUR_VIDEO_ID', // YouTube Video ID
    //   width: 560,               // Player width (in px)
    //   height: 316,              // Player height (in px)
      playerVars: {
        autoplay: 1,  
        mute: 1,      // Auto-play the video on load
        controls: 1,        // Show pause/play buttons in player
        showinfo: 0,        // Hide the video title
        modestbranding: 1,  // Hide the Youtube Logo
        loop: 1,            // Run the video in a loop
        fs: 0,              // Hide the full screen button
        cc_load_policy: 0, // Hide closed captions
        iv_load_policy: 3,  // Hide the Video Annotations
        autohide: 0         // Hide video controls when playing
      },
      events: {
        onReady: function(e) {
          e.target.mute();
        }
      }
    });
   }