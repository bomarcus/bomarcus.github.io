export function getAboutContent() {
  const aboutContent = `
  

Since graduating Stockholm University of the Arts with a Bachelor's degree in Film Sound in 2021, I have been working at Chroma Studios AB and as a freelance sound post production persron.

In have also done some assistant Art depaertment work.

Ziba - 2021 
Max Anger - 2021 Sound assistnt. Ambiences etc.
Land of the free - 2020 . Guldbagge nominerad kortfilm w/Therese Gylfe
Aniara - 2018Props


In did alot at my last place of work. open to explorations and new challenges.


Software in order of confidence.
**Pro Tools Ultimate**
**Dolby Atmos Renderer**
**Logic Pro X**
**Reaper**
**Bronze Composer.**
**Fmod**
**Unreal**
**Blender**
**ChatGPT**


Sound Designer/Mixer - Freelance

Chroma Studios AB - Sound Designer

<strong>Education</strong>

Stockholm University of the Arts
Bachelor's degree, Film Sound 2021

Kulturama Film production 2016
Kulturama Film/Cinema/Video Studies 2015

`.replace(/\n/g, "<br>"); // replace newline characters with <br>
  const aboutPara = document.createElement("p");
  aboutPara.innerHTML = aboutContent; // use innerHTML instead of textContent
  aboutPara.classList.add("p-2", "text-lg", "leading-relaxed"); // add Tailwind CSS classes
  return aboutPara;
}
