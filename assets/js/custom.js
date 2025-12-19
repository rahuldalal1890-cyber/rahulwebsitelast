document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     LAB 5 – CONTACT FORM (FINAL, SIMPLE & WORKING)
  ====================================================== */

  const form = document.getElementById("rahul-contact-form");
  if (!form) return;   // agar contact page nahi hai to kuch mat karo

  const resultBox = document.getElementById("form-results");
  const submitBtn = form.querySelector("button[type='submit']");

  const nameInput = document.getElementById("name");
  const surnameInput = document.getElementById("surname");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");

  const rating1 = document.getElementById("rating1");
  const rating2 = document.getElementById("rating2");
  const rating3 = document.getElementById("rating3");

  submitBtn.disabled = true;

  /* ===== VALIDATION HELPERS ===== */
  function invalid(el) {
    el.classList.remove("is-valid");
    el.classList.add("is-invalid");
  }

  function valid(el) {
    el.classList.remove("is-invalid");
    el.classList.add("is-valid");
  }

  function checkText(el) {
    if (el.value.trim().length < 2) {
      invalid(el);
      return false;
    }
    valid(el);
    return true;
  }

  function checkEmail(el) {
    const ok = /^\S+@\S+\.\S+$/.test(el.value.trim());
    ok ? valid(el) : invalid(el);
    return ok;
  }

  function checkRating(el) {
    const v = Number(el.value);
    if (v < 1 || v > 10) {
      invalid(el);
      return false;
    }
    valid(el);
    return true;
  }

  /* ===== FORM CHECK ===== */
  function checkForm() {
    const ok =
      checkText(nameInput) &&
      checkText(surnameInput) &&
      checkEmail(emailInput) &&
      checkText(phoneInput) &&
      checkText(addressInput) &&
      checkRating(rating1) &&
      checkRating(rating2) &&
      checkRating(rating3);

    submitBtn.disabled = !ok;
    return ok;
  }

  [
    nameInput,
    surnameInput,
    emailInput,
    phoneInput,
    addressInput,
    rating1,
    rating2,
    rating3
  ].forEach(el => el.addEventListener("input", checkForm));

  /* ===== SAVE DATA ===== */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      name: nameInput.value,
      surname: surnameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      address: addressInput.value,
      rating1: rating1.value,
      rating2: rating2.value,
      rating3: rating3.value,
      savedAt: new Date().toLocaleString()
    };

    // ✅ SAVE TO LOCAL STORAGE
    localStorage.setItem("rahul_contact_data", JSON.stringify(data));

    resultBox.innerHTML = "✅ Form saved successfully!";
    resultBox.style.color = "green";

    form.reset();
    submitBtn.disabled = true;

    // remove green/red after reset
    document.querySelectorAll(".is-valid, .is-invalid")
      .forEach(el => el.classList.remove("is-valid", "is-invalid"));
  });

});
