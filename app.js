document.addEventListener("DOMContentLoaded", () => {
  if (formType === "checkinout") {
    document.getElementById("checkForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const bikeReading = document.getElementById("bikeReading").value;
      const action = document.getElementById("actionType").value;
      const imageFile = document.getElementById("bikeImage").files[0];

      const reader = new FileReader();
      reader.onloadend = async function () {
        const base64String = reader.result.split(",")[1];
        const mimeType = imageFile.type;

        const response = await fetch(GAS_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formType,
            action,
            bikeReading,
            imageBase64: base64String,
            imageType: mimeType,
          }),
        });

        const result = await response.json();
        alert(result.status === "success" ? "Submitted with Image!" : "Error: " + result.message);
      };

      reader.readAsDataURL(imageFile);
    });
  }

  if (formType === "routine") {
    document.getElementById("routineForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const entryType = document.getElementById("entryType").value;
      const placeOfStay = document.getElementById("placeOfStay").value;
      const fromPlace = document.getElementById("fromPlace").value;
      const toPlace = document.getElementById("toPlace").value;

      const response = await fetch(GAS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
          entryType,
          placeOfStay,
          fromPlace,
          toPlace,
        }),
      });

      const result = await response.json();
      alert(result.status === "success" ? "Routine Entry Saved!" : "Error: " + result.message);
    });
  }
});
