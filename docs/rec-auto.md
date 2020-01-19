## Recording notes

As well as manually entering notes into the pad grid, the Deluge allows you to record notes played on the audition pads, or in keyboard view, or on an external keyboard connected via MIDI.

Pressing the “record” button makes recording active whenever the Deluge is playing. Now, every time you press a row’s audition pad, a note will also be recorded into the current sequence - meaning it will appear in the 16x8 pad grid (unless you are scrolled so that you can’t see it).

Notes played in keyboard view or on a connected MIDI keyboard will be recorded also.

If your clip does not yet contain any notes, a mode will be engaged in which the clip’s length will continuously extent until you tell it to stop recording, e.g. by pressing the record button so that it is no longer illuminated. In this mode, the play-position cursor will be red. This mode is detailed under “recording into clips, and live looping”.

Or, if your clip already contains notes, or you have manually disarmed it from recording, the clip at its pre-existing length will loop continuously, allowing recorded notes to be added with each iteration through it. In this mode, the play-position cursor will be white.

Recorded notes are quantized to 32nd-notes by default. See the settings menu for instructions on how to change this.

You can undo your most recent recording by pressing the back button - see undo / redo.

If you are recording and your song doesn’t contain an audible beat to help you keep time, you may wish to enable the Deluge’s metronome, which can be done by holding the shift button and pressing the “tap tempo” button.

## Recording count-in

A recording count-in may be enabled in the settings menu. With it enabled, then anytime you begin playback (with Deluge as "master") with the record button illuminated, the Deluge will do an audible 4-beat count-in first.

## Parameter automation and recording

Above, we looked at how to affect sound parameters using the gold parameter knobs. These are useful to play with live, to achieve effects like sweeping a filter's frequency up and down. But you can also automate changes to any parameters (within clips) that the parameter knobs may control (except stutter), so that their values change automatically. (And the parameter knobs can be set to control almost any of the Deluge's internal sound parameters, or parameters on external equipment via MIDI CC messages.)

The simplest way to automate a parameter is to "record" knob movement. While the Deluge is in record mode (press the "record" button), any movement of a parameter knob is recorded for that parameter. Recording begins when you begin to turn the knob, and ceases when the knob has been left alone for a second or so (a smooth transition back to the original value is then applied).

When the clip is then played back (or when it loops back to its start - potentially very soon), you will hear the automated parameter movement play back and see the level-meter for the corresponding parameter knob move automatically.

You can overwrite the automation by simply turning the parameter knob some more while still in record mode.

Once out of record mode (press the "record" button so that it is no longer illuminated), the parameter will continue to be automated while play mode is active. You may still take manual control of the parameter at any time by turning the corresponding parameter knob. Then, after leaving the knob alone for a second or so, the parameter value will smoothly transition back to follow its automated movement.

Automation can also be manually set for a time-region based on a note which is present in the sequence. Simply hold down the note's pad in clip view, and turn a parameter knob. The parameter value will be set just for the region of time beginning at that note and ending at the start of the next note. Having the region extended to the start of the next note in this way is helpful in many cases, preventing a return to the original parameter value from cutting in suddenly as the note’s sound releases.

Once a parameter has automation applied in some region of a clip, the Deluge considers the parameter to be automated entirely, with its previous unautomated value applying in all other regions. It is also worth noting that all parameter automation, once created, exists independently of any notes, meaning that even if notes are deleted, or more notes added, the parameter automation will still exist in its region.

Automation can also be recorded and manually set using an external MIDI controller, if a parameter is set up to be controlled in this way.

Automation edits and recording can be undone or redone by pressing back or shift+back respectively - see undo / redo.

To delete all automation for a given parameter, hold down the "shift" button and press down on the parameter knob for that parameter. Or, if the parameter was instead controlled via a knob on an external MIDI controller, automation may be deleted by putting the Deluge into record mode with playback on, holding down "shift", and turning the knob on the MIDI controller.

## Copying and pasting parameter automation

Parameter automation may be copied and pasted in a similar way to notes (see above). Automation is copied one parameter at a time, and just for the time-region occupied by the Deluge’s pads (the “current view”) at your current scroll and zoom position.

To copy an automated parameter, hold the learn button and press down on the gold parameter knob belonging to the parameter.

To paste automation to a parameter, hold learn and shift, and press down on the parameter knob.

You can copy and paste between different parameters, different tracks, and even different song files. The part which is copied and pasted is the horizontal "length" of your “view”, or the time-region that your view makes up.

You can even change your zoom level after copying and before pasting: if your zoom level is different when you paste, the automation will be stretched out or squeezed in to fit your new zoom level.
