# Expo Camera: Intermittent Corrupted Image URI

This repository demonstrates a bug in the Expo Camera API where the URI of a captured image is sometimes corrupted after using `takePictureAsync`.  The image preview displays correctly, but the returned URI is invalid, preventing image processing.

## Bug Reproduction

1. Clone this repository.
2. Run `npm install`.
3. Run `expo start`. 
4. Take multiple pictures using the app. You may need to take several images before the bug appears.  The frequency seems related to image size and processing.

## Potential Causes

* Asynchronous operations within the `takePictureAsync` function.
* Memory management issues in Expo's Camera component when handling large images.
* Race conditions between image capture and URI generation.

## Solution

See `bugSolution.js` for a potential workaround involving error handling and URI validation.  It's crucial to add robust error handling when working with asynchronous operations and potentially large media files in Expo.