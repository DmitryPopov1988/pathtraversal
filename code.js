There are elements that retrieve focus that are not interactive, this is illogical and may disadvantage keyboard users. 

Where:

‘Car details - Your car’ on manual vehicle lookup once you’ve selected options, the car details beneath ‘We found this car’ can be navigated to on keyboard:

Recommended fix:

Make sure that the non-interactive elements do not receive keyboard focus. For example, make sure to avoid using tabindex="0" on elements that should not receive focus. If you need the non-interactive elements to be capable of receiving focus through the focus method, use tabindex="-1", this allows elements to be used as a target for the focus method without adding them to the focus order.

:info: Found on desktop.

Acceptance Criteria

Non-interactive element beneath ‘We found this car’ heading do not receive keyboard focus and is not navigated to on the keyboard.
