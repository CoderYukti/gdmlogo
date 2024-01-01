    // Get form and paragraph elements
    const Headerform = document.getElementById('locationform');
    const Footerform = document.getElementById('locationformfooter');
    const displayTextHeader = document.getElementById('displayTextHeader');
    const displayTextFooter = document.getElementById('displayTextFooter');
    const displayPara = displayTextHeader.querySelector('p');
    const displayParaFooter = displayTextFooter.querySelector('p');
    const headerContainer = document.querySelector('.header-container');
    const footerContainer = document.querySelector('.footer-container');
    const headerLogo = document.querySelector('.headerlogo');
    const footerLogo = document.querySelector('.footerlogo');
    const downloadBtn = document.getElementById('downloadbtn');

    // Add submit event listener to the form
    Headerform.addEventListener('submit', function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Get the input value
      const inputValue = document.getElementById('locationname').value;

      // Display the input value in the span
      displayPara.textContent = inputValue;

      // Clear any previous inline styles
      displayTextHeader.style.removeProperty('letter-spacing');
      displayTextHeader.style.overflow = 'visible'; // Reset overflow property

      // Calculate the necessary adjustments to fit the content within the fixed width
      const defaultLetterSpacing = 12; // Set your default CSS letter spacing
      const containerWidth = 613; // Set your fixed container width
      const contentWidth = displayTextHeader.scrollWidth;

      // Check if the text overflows and adjust letter spacing accordingly
      if (contentWidth > containerWidth) {
        const spacingDifference = contentWidth - containerWidth;
        const dynamicLetterSpacing = defaultLetterSpacing - spacingDifference / (inputValue.length - 1);

        // Limit the negative letter-spacing to a maximum of -2
        displayTextHeader.style.letterSpacing = `${Math.max(-2, dynamicLetterSpacing)}px`;
        displayTextHeader.style.overflow = 'hidden'; // Set overflow to hidden
      } else {
        // Reset to default letter-spacing if it doesn't overflow
        displayTextHeader.style.letterSpacing = `${defaultLetterSpacing}px`;
      }

      // Remove letter-spacing from the last letter
      const lastLetterIndex = inputValue.length - 1;

      // Get the last character directly
      const lastLetter = displayPara.textContent[lastLetterIndex];

      // Create a span element for the last letter
      const lastLetterSpan = document.createElement('span');
      lastLetterSpan.textContent = lastLetter;

      // Add a class to the last letter span
      lastLetterSpan.classList.add('last-letter');

      // Append the new span for the last letter
      displayPara.innerHTML = inputValue.slice(0, lastLetterIndex) + lastLetterSpan.outerHTML;

      // Now, you can set styles on the last letter span
      const lastLetterSpanWithClass = document.querySelector('.last-letter');
      if (lastLetterSpanWithClass) {
        lastLetterSpanWithClass.style.letterSpacing = '0';
      }

    });

    // Add submit event listener to the form
    Footerform.addEventListener('submit', function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Get the input value
      const inputValueFooter = document.getElementById('locationnamefooter').value;

      // Display the input value in the span
      displayParaFooter.textContent = inputValueFooter;

      // Clear any previous inline styles
      displayTextFooter.style.removeProperty('letter-spacing');
      displayTextFooter.style.overflow = 'visible'; // Reset overflow property

      // Calculate the necessary adjustments to fit the content within the fixed width
      const defaultLetterSpacing = 12; // Set your default CSS letter spacing
      const containerWidth = 410; // Set your fixed container width
      const contentWidth = displayTextFooter.scrollWidth;

      // Check if the text overflows and adjust letter spacing accordingly
      if (contentWidth > containerWidth) {
        const spacingDifference = contentWidth - containerWidth;
        const dynamicLetterSpacing = defaultLetterSpacing - spacingDifference / inputValueFooter.length;

        // Limit the negative letter-spacing to a maximum of -2
        displayTextFooter.style.letterSpacing = `${Math.max(-2, dynamicLetterSpacing)}px`;
        displayTextFooter.style.overflow = 'hidden'; // Set overflow to hidden
      } else {
        // Reset to default letter-spacing if it doesn't overflow
        displayTextFooter.style.letterSpacing = `${defaultLetterSpacing}px`;
      }

      // Remove letter-spacing from the last letter
      const lastLetterIndexFooter = inputValueFooter.length - 1;

      // Get the last character directly
      const lastLetterFooter = displayParaFooter.textContent[lastLetterIndexFooter];

      // Create a span element for the last letter
      const lastLetterSpanFooter = document.createElement('span');
      lastLetterSpanFooter.textContent = lastLetterFooter;

      // Add a class to the last letter span
      lastLetterSpanFooter.classList.add('last-letter');

      // Append the new span for the last letter
      displayParaFooter.innerHTML = inputValueFooter.slice(0, lastLetterIndexFooter) + lastLetterSpanFooter.outerHTML;

      // Now, you can set styles on the last letter span
      const lastLetterSpanWithClass = document.querySelector('.last-letter');
      if (lastLetterSpanWithClass) {
        lastLetterSpanWithClass.style.letterSpacing = '0';
      }
    });

    // Add click event listener to header logo
    headerLogo.addEventListener('click', function () {
      headerContainer.classList.add('active');
      footerContainer.classList.remove('active');
    });

    // Add click event listener to footer logo
    footerLogo.addEventListener('click', function () {
      headerContainer.classList.remove('active');
      footerContainer.classList.add('active');
    });

    // Get the download button

    // Add click event listener to the download button
    downloadBtn.addEventListener('click', function () {
      // Get the active container
      const activeContainer = document.querySelector('.active .down-container');

      // Get the span element within the active container
      const activeSpan = activeContainer.querySelector('p');

      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set the canvas size based on the active container's size
      canvas.width = activeContainer.offsetWidth;
      canvas.height = activeContainer.offsetHeight;

      // Draw the content of the active container onto the canvas
      html2canvas(activeContainer, { backgroundColor: null }).then(function (canvas) {
        // Convert the canvas content to a data URL
        const dataUrl = canvas.toDataURL('image/png');

        // Create a download link
        const downloadLink = document.createElement('a');

        // Use the text content of the active span as the file name
        const fileName = activeSpan.textContent.trim().toLowerCase().replace(/\s+/g, '_') + '.png';

        downloadLink.href = dataUrl;
        downloadLink.download = fileName;

        // Trigger a click on the download link to start the download
        downloadLink.click();

        // Clean up: remove the canvas and download link
        if (downloadLink.parentNode) {
          document.body.removeChild(downloadLink);
        }
      });
    });