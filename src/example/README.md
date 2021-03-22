# SDK IFrameModal Implementation DEMO

This package contains a sample of the usage of the SDK to call the modal popup.

We use the package "smartprice" to call the modal.

In dist/index.html we have a divs with the class "smartprice-button" which will
render the button and open configured the modal.

## Notes

We output the following files to a dist folder using webpack: (index.html,
favicon.png, bundle.js and svg processed files) you may rename bundle.js to a
suitable name if you plan to test it.

Please check the configuration to review how we load the styles and svg files.

Use "yarn link" in the "smartprice" package, and then link it in the
"modal-demo" directory with "yarn link 'smartprice'" to link it.

## Button Snippet

Use the following code to integrate as a button

```html
<div
  class="smartprice-button"
  data-firstname="John"
  data-lastname="Doe"
  data-phone="2233445566"
  data-email="test@email.com"
  data-dob="2000-08-22"
></div>
```

and add the following script tags at the end body. To receive the confirmation
message from the modal window, you need to register the receiveMessage function

```html
<script src="https://test.smartprice.myrx.io/modal-demo/bundle.js"></script>
<script>
  /** Your implementation to receive the memberId
   * from SmartPRICE
   */
  const receiveMessage = (event) => {
    if (event.data.message === 'confirmation') {
      console.log(event.data.value.smartPriceMemberId);
      document.getElementById(
        'memberId'
      ).innerText = `SmartPRICE MemberId: ${event.data.value.smartPriceMemberId}`;
    }
  };
</script>
```
