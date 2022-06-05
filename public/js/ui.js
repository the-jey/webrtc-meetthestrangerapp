import * as constants from "./constants.js";
import * as elements from "./elements.js";

export const updatePersonalCode = (personalCode) => {
  const personalCodeParagraph = document.getElementById(
    "personal_code_paragraph"
  );

  personalCodeParagraph.innerHTML = personalCode;
};

export const updateLocalVideo = (stream) => {
  const localVideo = document.getElementById("local_video");
  localVideo.srcObject = stream;
  localVideo.addEventListener("loadedmetadata", () => {
    localVideo.play();
  });
};

export const updateRemoteVideo = (stream) => {
  const remoteVideo = document.getElementById("remote_video");
  remoteVideo.srcObject = stream;
};

export const showIncomingCallDialog = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  const callTypeInfo =
    callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";
  const incomingCallDialog = elements.getIncomingCallDialog(
    callTypeInfo,
    acceptCallHandler,
    rejectCallHandler
  );

  // remove all dialogs inside HTML dialog element
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
  dialog.appendChild(incomingCallDialog);
};

export const showCallingDialog = (rejectCallHandler) => {
  const callingDialog = elements.getCallingDialog(rejectCallHandler);

  // remove all dialogs inside HTML dialog element
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
  dialog.appendChild(callingDialog);
};

export const removeAllDialogs = () => {
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
};

export const showInfoDialog = (preOfferAnswer) => {
  let infoDialog = null;

  if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
    infoDialog = elements.getInfoDialog(
      "Call rejected!",
      "Callee has rejected your call..."
    );
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
    infoDialog = elements.getInfoDialog(
      "Callee Not Found!",
      "Please re-check the callee personal code..."
    );
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAIBALE) {
    infoDialog = elements.getInfoDialog(
      "Call Is Not Possible!",
      "Please try again later! Callee is unavaible for the moment..."
    );
  }

  if (infoDialog) {
    const dialog = document.getElementById("dialog");
    dialog.appendChild(infoDialog);
    setTimeout(() => {
      removeAllDialogs();
    }, [3000]);
  }
};

export const showCallElements = (callType) => {
  if (callType === constants.callType.CHAT_PERSONAL_CODE) {
    showChatCallElements();
  }

  if (callType === constants.callType.VIDEO_PERSONAL_CODE) {
    showVideoCallElements();
  }
};

const showChatCallElements = () => {
  const finishConnectionChatButtonContainer = document.getElementById(
    "finish_chat_button_container"
  );

  showElement(finishConnectionChatButtonContainer);
  const newMessageInput = document.getElementById("new_message");
  showElement(newMessageInput);

  disabledDashboard();
};

const showVideoCallElements = () => {
  const callButtons = document.getElementById("call_buttons");
  showElement(callButtons);

  const placeholder = document.getElementById("video_placeholder");
  hideElement(placeholder);

  const newMessageInput = document.getElementById("new_message");
  showElement(newMessageInput);

  const remoteVideo = document.getElementById("remote_video");
  showElement(remoteVideo);

  disabledDashboard();
};

// ui call buttons
const micOnImgSrc = "./utils/images/mic.png";
const micOffImgSrc = "./utils/images/micOff.png";

export const updateMicButton = (micActive) => {
  const micButtonImage = document.getElementById("mic_button_image");
  micButtonImage.src = micActive ? micOffImgSrc : micOnImgSrc;
};

const cameraOnImgSrc = "./utils/images/camera.png";
const cameraOffImgSrc = "./utils/images/cameraOff.png";

export const updateCameraButton = (cameraActive) => {
  const cameraButtonImage = document.getElementById("camera_button_image");
  cameraButtonImage.src = cameraActive ? cameraOffImgSrc : cameraOnImgSrc;
};

// ui messages
export const appendMessage = (message, right = false) => {
  const messageContainer = document.getElementById("messages_container");
  const messageElement = right
    ? elements.getRightMessage(message)
    : elements.getLeftMessage(message);

  messageContainer.appendChild(messageElement);
};

export const clearMessenger = () => {
  const messageContainer = document.getElementById("messages_container");
  messageContainer.querySelectorAll("*").forEach((m) => m.remove());
};

// ui recording
export const showRecorgindPanel = () => {
  const startRecordingButton = document.getElementById(
    "start_recording_button"
  );
  const recordingButtons = document.getElementById("video_recording_buttons");

  hideElement(startRecordingButton);
  showElement(recordingButtons);
};

export const resetRecordingButtons = () => {
  const recordingButtons = document.getElementById("video_recording_buttons");

  const startRecordingButton = document.getElementById(
    "start_recording_button"
  );

  hideElement(recordingButtons);
  showElement(startRecordingButton);
};

export const switchRecordingsButtons = (switchForResumeButton = false) => {
  const resumeButton = document.getElementById("resume_recording_button");
  const pauseButton = document.getElementById("pause_recording_button");

  if (switchForResumeButton) {
    hideElement(pauseButton);
    showElement(resumeButton);
  } else {
    hideElement(resumeButton);
    showElement(pauseButton);
  }
};

// ui helper function
const enableDashboard = () => {
  const dashboardBlocker = document.getElementById("dashboard_blur");

  if (!dashboardBlocker.classList.contains("display_none")) {
    dashboardBlocker.classList.add("display_none");
  }
};

const disabledDashboard = () => {
  const dashboardBlocker = document.getElementById("dashboard_blur");
  if (dashboardBlocker.classList.contains("display_none")) {
    dashboardBlocker.classList.remove("display_none");
  }
};

const hideElement = (element) => {
  if (!element.classList.contains("display_none")) {
    element.classList.add("display_none");
  }
};

const showElement = (element) => {
  if (element.classList.contains("display_none")) {
    element.classList.remove("display_none");
  }
};
