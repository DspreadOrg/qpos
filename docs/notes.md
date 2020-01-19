## Notes of different length

At any zoom level, in most cases, a note created on a given pad lasts up until the “start” of the next pad to the right. Or in other words, if you are zoomed such that you are looking at 16th notes (press down on the ◄► knob to be reminded of your zoom level), then the pads are spaced apart by 16th notes and all notes created will be a 16th note long.

(It should be pointed out that for longer samples such as many of those provided in the Deluge’s supplied kits, notes longer than one pad will automatically be created - see Kit clips.)

To manually create a note which is longer, hold down on the note’s pad, and then press some other pad further to the right on the same row. The note will extend to occupy all pads in between. You will notice that only the leftmost pad occupied by the note is brightly coloured - the other pads are dimmer. This is to indicate that they are the extension of an existing note, rather than representing a new note beginning on that pad.

A long note may be shortened by “deleting” the portion of if that falls beyond a certain pad which it currently occupies, by simply pressing that pad.

Note that some sound presets do not allow notes’ length to be altered. Those consisting of short, percussive sounds (e.g. drums), are intended to always sound the same, without note-length as an option. In these cases, notes will always appear to occupy just one pad at all zoom levels.

Since the Clip view edits a sequence which will play repeatedly, it is foreseeable that you may wish to create a note which begins toward the end of the sequence, and extends so that it continues back into the beginning of the sequence - to continue sounding even after the sequence has restarted. To do this, create the note at the point in time where you wish it to begin, and then (even after scrolling or zooming if you wish) hold down on the ◄► knob and press the final pad that you wish the note to occupy (this will presumably be to the left of where the note started).

For a “drone” note which stays on permanently, simply create a note which occupies the entire length of the clip (enter a note at the first, leftmost column, then hold ◄► while pressing the last pad at the rightmost column). The Deluge treats such notes as a special case, and will keep the note permanently sounding rather than restarting it each time the clip’s sequence loops.

## Editing note velocity

The Deluge’s pads are not velocity-sensitive, but notes created as part of a sequence may have their velocity manually edited. To do this, hold down the pad corresponding to a note and turn the ◄► encoder. The velocity value will show on the Deluge’s numeric display. Velocity values range between 1 and 127.

Newly created notes, and notes sounded with the audition pads, will default to the same velocity as the last sequence-note touched on that clip - with 64 being the initial default.

For those not familiar with the concept of note velocity, it is intended as an electronic representation of the physical force with which a note is played (e.g. how hard a guitar string is plucked). With electronic music equipment in general, the resulting effect is most commonly a difference in volume. This is how most of the Deluge’s included synth and kit presets are set up to respond to velocity. However, velocity can in fact be patched to almost any parameter in the Deluge’s synthesis- and sampling engine, making it simply a tool with which you can make different notes sound different, in any way you care to configure. See the modulation section in the chapter on the sound editor

You can hold multiple notes simultaneously to edit their velocity together.

Any notes recorded via MIDI will have their velocity recorded.

## Note probability and iteration dependence

The Deluge allows each sequenced note to have a condition set to decide, at each playback iteration (i.e. repeat), whether that note plays or not. These may be based on an element of randomness, (“probability”), or dependent on how many times the clip has played through (e.g. “play only on the third of every four iterations”).

To set a probability or iteration dependence for a note, hold down its pad and turn the select knob. (Anti-clockwise for a probability, which will display as a numeric percentage, or clockwise for an iteration dependence, which will display in the form of “3of4” which would mean the 3rd out of every 4 repeats).

For notes at the same time (horizontal) position, if their given probabilities add up to 100, then a special function is performed: always exactly one of the notes will play, as opposed to the notes’ probabilities being treated independently. This allows you to have a point in your sequence where, at random at each iteration, one of several different potential notes will sound - but never more than one of them.

There is another special function, for notes at the same time (horizontal) position that have the same probability number: they will always either all play together, or all not play - so you could have a whole chord which either all plays, or all doesn't play. (Make sure that the note’s probabilities don’t add up to 100, otherwise the previous paragraph’s logic will apply instead.)

Notes' triggering may be set to depend on an earlier note in the sequence being triggered. Let's say you've set a note's probability to 70%. If you make another note at a different time-position and set its probability to 70% also, you'll notice that you're offered an additional option - a 70 with a dot (.) after it. This means "trigger me only if the previous 70% note was successfully triggered". There will additionally be an extra option of 30% with a dot after it, which in this case will mean "play me only if the previous 70% note was not triggered". (30% being 100% minus 70%.)

As a shortcut to automatically set up the above for you, you can hold multiple notes simultaneously (even at different time-positions) and turn the select knob to set them to always play together.

## Triplets view

Triplets view is activated by pressing the “triplets view” button, and basically changes the pad grid’s function to divide time into threes rather than fours, allowing you to create triplets.

Your zoom level when you enter triplets view makes a difference. Let’s say you were zoomed to be viewing 16th notes (press down on the ◄► knob to be reminded of your zoom level). After entering triplets view, rather than each quarter of the 16x8 pad grid giving you 4 columns of 16th-notes, each quarter is instead divided into 3, with the fourth column greyed out and not used in this view. These 3 divisions will total the same amount of time that the 4 divisions previously did, despite looking slightly different.

Or, if you had been zoomed to be viewing 8th notes, the same effect would have been applied to them. Once in triplets view, even if you change your zoom level, same time-division which had previously been divided into 4 remains now divided into 3. If you wish to create triplets for a different time-division (e.g. 8th-notes if you’d previously created triplets for 16th-notes), you may exit and then re-enter triplets view.

## Recording notes

As well as manually entering notes into the pad grid, the Deluge allows you to record notes played on the audition pads, or in keyboard view, or on an external keyboard connected via MIDI.

Pressing the “record” button makes recording active whenever the Deluge is playing. Now, every time you press a row’s audition pad, a note will also be recorded into the current sequence - meaning it will appear in the 16x8 pad grid (unless you are scrolled so that you can’t see it).

Notes played in keyboard view or on a connected MIDI keyboard will be recorded also.

If your clip does not yet contain any notes, a mode will be engaged in which the clip’s length will continuously extent until you tell it to stop recording, e.g. by pressing the record button so that it is no longer illuminated. In this mode, the play-position cursor will be red. This mode is detailed under “recording into clips, and live looping”.

Or, if your clip already contains notes, or you have manually disarmed it from recording, the clip at its pre-existing length will loop continuously, allowing recorded notes to be added with each iteration through it. In this mode, the play-position cursor will be white.

Recorded notes are quantized to 32nd-notes by default. See the settings menu for instructions on how to change this.

You can undo your most recent recording by pressing the back button - see undo / redo.

If you are recording and your song doesn’t contain an audible beat to help you keep time, you may wish to enable the Deluge’s metronome, which can be done by holding the shift button and pressing the “tap tempo” button.

## Copying and pasting notes

The Deluge allows you to copy and paste the notes in the time-region occupied by its pads (the “current view / screen”) at your current scroll and zoom position.

To copy notes, hold the learn button and press down on the ◄► knob.

To paste notes, hold learn and shift, and press down on the ◄► knob.

You can copy and paste between different clips or even song files. The part which is copied and pasted is the horizontal "length" of your “view”, or the time-region that your view makes up. This will also include notes which are "offscreen" above or below what you can see, because these are in the same time-region. Your vertical scroll position is taken into account. You could "transpose" a part by copying it, scrolling up or down, then pasting it.

You can even change your zoom level after copying and before pasting: if your zoom level is different when you paste, the notes will be stretched out or squeezed in to fit your new zoom level.
