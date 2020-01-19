## Sequence Editing

Powering on the Deluge automatically creates a blank song with one blank clip with a synth assigned to it, and puts the device into clip view for this clip.

In this view, the main 16x8 grid of pads represents a piano-roll-style view of the sequence of notes that the track contains. The leftmost column of pads represents the first beat in the sequence, while the columns further to the right represent increasingly later points (steps) in time.

Vertically, pitch is represented (except for kit clips) - the bottom row of pads represents the lowest note on display, and higher rows represent increasingly higher notes.

Pressing the Deluge’s play button plays the entered sequence.

With each row representing a different pitch, the user may wish to audition any of the available pitches before actually placing those notes in the sequence. This can be achieved by pressing the very rightmost pad (the “audition” pad) for a given row.

Notes in the sequence itself may be created by pressing a pad in the main 16x8 group corresponding to a pitch and a moment in time. The pad will light up to indicate the presence of a note. If the Deluge is not in play-mode, the note will sound immediately, as an aid to the user. This will not happen if the Deluge is in play-mode, when the user might be in the middle of a performance and would likely prefer for their editing to be allowed without additional audible aids.
Tapping a pad for which a note is already present will delete the note.

Editing notes in this way may be undone or redone by pressing back or shift+back respectively - see undo / redo.

The colour of the notes on display is arbitrary, and may be changed by the user. This is handy when the user has created multiple clips and wishes for them to appear as different colours in song view.
Simply hold down the shift button and turn the ▼▲ knob to change the colour of a clip.

To adjust the brightness of the Deluge’s LEDs, hold down the shift button and the learn button and turn the ▼▲ knob.

## Cross-Screen Editing

Suppose you have a simple drum beat, 1 bar long. Perhaps you want to add a couple of extra snare hits at the end of each 4-bar phrase. The way to achieve this is to “multiply” the sequence (twice) so that it is 4 bars long (see Editing track length), and then make whatever changes you wish to the final bar. However, you have now ended up with 4 duplicates of almost the same beat, and this could cause problems: what if you want to change, say, the hi-hat pattern - do you have to go and do it 4 times?

This is the situation in which the Deluge’s cross-screen edit mode is helpful. At any given zoom level, if you enter cross-screen edit mode, then any editing you do will apply not only to the part of the sequence that you are currently scrolled to, but also to all other “screens” which could be scrolled to by turning the ◄► knob.

So, continuing the above example where you have 1 bar copied 4 times to make 4 bars total, you would zoom so that 1 bar occupies the entire 16x8 grid (that’s the 16th-note zoom level), then enter cross-screen edit mode. Any changes you subsequently make to your 1 bar will then be applied to all 4 bars.

Cross-screen edit mode always remains functionally locked to the zoom level you were at when it was activated. Continuing the example, even if, while in cross-screen edit mode, you zoomed in so that just half a bar now occupied the 16x8 grid, your edits would still be applied on a per-bar basis, not a per-half-bar basis.

Clips individually remember whether, and at what zoom level, they have cross-screen edit mode applied - if you enter the mode for one track, it will not automatically be active for any other track that you then edit.
