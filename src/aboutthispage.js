export function getAboutThisPageContent() {
  const aboutContent = `
  
        <p>All code written using Github Copilot and ChatGPT-4</p>
        <p> Page is dynamically created from a
            json to keep a consistent format of
            items on the page and a
            central point of all information and
            links for the page</p>
        <p> Page is hosted on github pages or
            Vercel for cost </p>
        <p> Media is hosted and delivered from
            google cloud free tier </p>
        <p> Audio is played using wavesurfer.js
            and waveforms are calculated on page
            load</p>
        <p> Media is hls (and i added dash format
            for testing) according to Apple HTTP
            Live Streaming and
            MPEG-DASH
            standards, using ffmpeg, gpac, bento
            (tested some different ones), dolby
            mp4demux and mux for
            splitting mp4 when needed. Validated
            with apple live streaming tools.</p>
        <p> Bitrate ladder from Netflix
            recomendation.</p>
        <p> Videos are played using apple native
            player(name?)
            and shaka player for wider browser
            support. Dolby atmos is supported on ios
            and safari in eac3joc
            format</p>
        <hr>
        <p> Dolby Atmos Content created with Pro
            Tools/Logic Pro X and Dolby Atmos
            renderer, then the Atmos
            Master file is converted to MP4</p>
        <p> fmp4</p>
        <hr>
        <p> I hope this all runs fairly well. The
            last time i did this (and first..) end
            point was an ios app
            using apples system for spatial audio.
            Now in when browser is end point i
            wanted wider browser support which
            introduced some new codec
            culprits... </p>
        <p> Ive tried react, Bootstrap, googles
            mui systems, some sass during this
            project but decided to try to
            keep it basic. </p>
        <p> This is not an attempt to pass myself
            off as a programmer/coder. I just really
            enjoy poking around
            in stuff and this deeper level of
            control when trying to create something
            is just wonderful. If
            anything thats what id like to show
            here. Me enjoying that. </p>
        <p> Stockholm </p>
        <p> 0734166034 </p>
        <p> bomarcusohlsson@gmail.com </p>
        <p> shaka player, ffmpeg, dolby mp4demux
            dolby mp4mux </p>
        <p> improvement plans: </p>
        <p> pre-decode waveforms using wavesurfer
            for faster load </p>
        <p> would love to get Eyevinns AutoVMAF to
            run to make the ABR ladder creation
            simpler</p>
        <p> search bar content filtering</p>
        <p> keyboard navigation</p>
        <p> Implement more best practices for
            accesability and device compatibility.
        </p>
        <img src="temp_media/antichrist-chaos-reigns.gif" alt="Description of the GIF">

`.replace(/\n/g, "<br>"); // replace newline characters with <br>
  const aboutPara = document.createElement("p");
  aboutPara.innerHTML = aboutContent; // use innerHTML instead of textContent
  aboutPara.classList.add("p-2", "text-sm", "leading-relaxed"); // add Tailwind CSS classes
  return aboutPara;
}
