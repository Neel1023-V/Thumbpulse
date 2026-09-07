const imageUpload = document.getElementById("imageUpload");
const previewImg = document.getElementById("previewImg");
const videoTitleInput = document.getElementById("videoTitle");
const channelNameInput = document.getElementById("channelName");
const videoViewsInput = document.getElementById("videoViews");

const displayTitle = document.getElementById("displayTitle");
const displayChannel = document.getElementById("displayChannel");
const displayMeta = document.getElementById("displayMeta");

imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      previewImg.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

videoTitleInput.addEventListener("input", (e) => {
  displayTitle.textContent = e.target.value || "Untitled Video";
});

channelNameInput.addEventListener("input", (e) => {
  displayChannel.textContent = e.target.value;
});

videoViewsInput.addEventListener("input", (e) => {
  displayMeta.textContent = e.target.value;
});