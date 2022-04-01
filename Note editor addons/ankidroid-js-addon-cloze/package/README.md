Create cloze overlapping notes in AnkiDroid

## Install
View installation instructions [here](https://github.com/krmanik/ankidroid-js-addon#how-to-install-addons)

## Usage
### Create cloze from list
1. Download sample deck it contains template for the deck.

    a) Download the deck which contains template for cloze
    - [Sample cloze deck](https://github.com/krmanik/ankidroid-js-addon/raw/main/Sample%20deck/Sample%20Cloze%20Deck.apkg)

    b) Import in AnkiDroid

2. Select `Cloze (Overlapping)` in note type
3. Long press `[ ]` to change config
4. Add item list per line in edit text
5. Click `[ ]` generate cloze
6. Add notes to the deck

### Create cloze from text
Note: To add `[[oc1::some text]]` in Original field follow this
1. Click `[+]` to `Create toolbar item`
2. Enter `[[oc::` in `HTML Before Selection`
3. Enter `]]` in `HTML After Selection`
4. Then Click `Create` to add item to toolbar

Now in `Original` field select any text and click newly created toolbar item. It will replace the text with `[[oc::some text]]`. 

Add a number in order after `[[oc::`. <br>
For e.g. <br>
`[[oc::]]` -> `[[oc1::some text]]`<br>
`[[oc::]]` -> `[[oc2::some other text]]`<br>
`[[oc::]]` -> `[[oc3::some more text]]`<br>
 
 5. Then click `[ ]` to generate cloze for the text
 6. Finally add notes to deck

## Demo
### Install Addon
https://user-images.githubusercontent.com/12841290/137604159-89647fda-b3d0-4471-8c0d-7bd47d05e709.mp4

### Add sample cloze overlapper deck
https://user-images.githubusercontent.com/12841290/137604164-8e99adbe-a4ad-4470-a054-989f74fe3079.mp4

### Create cloze from list
https://user-images.githubusercontent.com/12841290/137604126-db0763da-8da6-4590-b8b1-87bfd02ef8d6.mp4

### Create cloze from text
https://user-images.githubusercontent.com/12841290/137604130-8118efb0-c804-43d3-8dba-681e042d53f5.mp4

## License
**cloze-overlapper**<br>
The deck and its template taken from [cloze-overlapper](https://github.com/glutanimate/cloze-overlapper) developed by Glutanimate. Its python code converted to javascript. Support work of [Glutanimate](https://www.patreon.com/glutanimate).<br>
[Click here to support Glutanimate's work](https://glutanimate.com/support-my-work/)<br>
AGPL-3.0 License

**[ocloze](https://github.com/krmanik/ocloze)**<br>
Copyright (c) 2021 Mani <br>
AGPL-3.0 License