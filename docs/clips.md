## Kit Clips

Instead of having a synth assigned, a clip may have a “kit”. For kit clips, each row of pads represents an entirely different sound, as opposed to a different pitch for the same sound as with synth clips. One of the obvious applications of this function is the creation of drum beats - one row of pads could represent the kick drum, another the snare, etc.

To turn a clip into a kit clip, simply press the kit button. One of the supplied kit presets will take effect, and each row of pads will now correspond to a different sound. You may edit and audition notes exactly as with a synth clip.

The Deluge comes with a number of kits consisting of drum sounds. It also comes with kits consisting of a variety of other samples. While drum sounds are typically short and sharp, many of these other samples are longer, and the user may wish to control how long a sample plays for. When adding a “note” of one of these longer samples, by pressing one of the 16 main pads on its row, a “longer” note will automatically be created, occupying multiple pads horizontally on the grid. See Notes of different length to learn how to understand and edit the length of these longer notes.

Some of the samples in the provided kits even include pre-recorded beats or loops. These are set up to time-stretch so that they always play at whatever tempo you have the Deluge set to. When you create an instance of one of these samples, again it will appear as one long “note” occupying many pads horizontally - however many it needs based on its length. If it is longer than the current clip, the clip’s length may automatically be extended too, to make room for it.

An entire sound (common example: the kick drum) may be muted out by pressing the corresponding pad-row’s mute pad (second from the right; green). It will turn yellow to indicate that the row is muted.
The mute-row function is also available for synth clips, though perhaps less applicable.

In kit clips, each sound / row has a different colour. The colour of an individual row may be altered by holding the shift button + holding the audition pad (far-right) for the row, and turning the ▼▲ knob.

For kit clips, the sounds / rows may be re-ordered. To do this, hold down the audition pad (far-right) for the row, and hold down the ▼▲ encoder while turning it. Scrolling will occur, but the selected row will move along with the scrolling (i.e. it will appear to stay still while the other rows scroll past it).

New sounds (samples from the SD card in the most basic case) may be added to an existing kit, too.

Rows within a kit can also output MIDI notes or gate - see outputting MIDI or gate in a kit.

## MIDI and CV Clips

Just as a clip may be a synth or kit clip, it can also be a MIDI or CV clip. This is set by pressing the MIDI or CV button while in clip view for a given clip, and will set the clip to output its note information on a particular MIDI or CV channel rather than producing sound in the Deluge itself. The channel number will show on the numeric display in place of the synth / kit preset number, and may be changed by turning the select knob.

See the chapter on CV for further info.

MIDI clips may have automated parameters too - see controlling and sequencing MIDI CC, pitch bend and channel aftertouch.

## Audio Clips

Much like instrument clips, which play sequenced notes in sync and as part of the currently loaded song on the Deluge, audio clips allow an audio recording to be consistently played or looped, or even recorded, in sync with the Deluge’s other functions. Audio clips will always be time-stretched (or pitch-adjusted if set to link pitch and speed) if needed to keep them in-sync with the song.

Common uses of audio clips on the Deluge include live looping, simple playback of pre-recorded beats or loops as an alternative to sequencing individual notes, or multitrack audio recording.

Audio clips can either be created or recorded in song view (suitable for looping), or created or recorded in arranger view (for multitrack “DAW-like” recording).

Audio clips may be viewed in clip view, just like instrument clips, and will display as a graphical representation of their waveform (as opposed to the notes which are displayed and editable for instrument clips). Your view is still tied to the beat, with each column of pads corresponding to a time division, e.g. 16th-notes. And when viewing any clip, you may scroll and zoom horizontally.

If you have opted to create a blank audio clip as opposed to recording audio into one (these options detailed above), you are likely to want to load an audio file into it. From audio clip view, you may enter the file browser by using the “browse” shortcut, or by pressing the select knob to enter the sound editor and navigating to FILE.

### Audio clip length editing and changing of waveform loop points

In audio clip view, much like instrument clip view, you can change the clip’s length by holding shift and turning the ◄► knob. When this is done to an audio clip, the audio waveform shortens and lengthens with the clip’s length, causing the audio to sound faster or slower.

If you instead want to trim or extend the audio clip while leaving its waveform unstretched, tap a pad at the right-most end of the visible waveform. A red marker will begin blinking there, representing the loop-point in a similar way to in waveform view. You may now tap where you want to move it to. Or you can tap the red marker again to make it disappear.

Or, if you want low-level control over the exact start and end points on the audio waveform, you can enter waveform view for an audio clip to edit these. Despite waveform view looking quite similar to audio clip view, where you also view the waveform, it can be distinguished by the waveform being white instead of coloured. The key difference in function is that while audio clip view shows the waveform as synced to the song’s time-divisions - e.g. 16th-notes - waveform view is free from this constraint and allows you to zoom right down to the individual sample level.

When you edit the waveform start and end points for an audio clip in waveform view, you are selecting the portion of the waveform which the Deluge will stretch between the start and end of the audio clip - whose length is tied to the song’s tempo - e.g. “1 bar long” - and will not change. So, changing these waveform start and end points is likely to cause the waveform to be time-stretched when played. Depending on what you’re aiming to achieve, and particularly if you have moved these points by only a small amount, you may wish to reset or “grab” the song’s tempo (see next section) to match the new length of the selected portion of the waveform - so that it will not be time-stretched.

### Grabbing tempo from an audio clip

Similarly to setting the tempo with the first-recorded loop, you may manually tell the Deluge to grab the tempo from an existing audio clip, such that the clip will then play back at its native rate with no time-stretching applied.

To do this, hold down the tempo knob and either press any main pad while in audio clip view, or if in song view, press any of the main 16 pads on the clip’s row.

This may be useful when loading an existing audio file into an audio clip and wishing to set the song to its tempo, or to return to the original tempo at which clips were recorded if the tempo has since been changed, or after minor edits to an audio clip’s waveform’s start and end points (see previous section).

## Editing clip length

The length of a clip may also be altered. If made longer than the default 1 bar, the clip will extend beyond the length of the “display” even at 16th-notes zoom level, meaning that you will now be able to scroll horizontally at this zoom level too, or even zoom out another zoom level (8th-notes would be next), to see the entirety of the clip.

Editing clip length is achieved by holding the shift button and turning the ◄► knob. At each click of the knob, the clip’s new length will blink momentarily on the Deluge’s numeric display, formatted as three numbers (bars, beats, then 16th-notes). Clips may be any length, including unusual ones - e.g. 15 16th-notes long (which would display as “0.3.3”, meaning 3 quarter-notes plus 3 16th-notes.

The clip’s length will also be indicated visually: columns of pads which are beyond the clip’s end will appear dim and grey. If you extend a clip’s length beyond the right-hand side of the current grid, you will be scrolled right automatically to see the new “space” you have created. Or if you reduce a clip’s length to half or less of the grid, the Deluge will automatically zoom in to display the remaining area in more detail.

Sometimes you may wish to “multiply” an existing clip’s length - that is, to make a copy of the clip’s existing sequence of notes, and place that copy after the original. To do this, hold down the shift button and press down on the ◄► knob. The Deluge will then automatically zoom out to reveal the entirety of the multiplied clip. When multiplying a clip containing notes with iteration dependence set, the resulting notes automatically have their iteration dependence modified, or are left out entirely, in order to keep the resulting composition sounding the same as the unmultiplied clip wherever possible.

## Shifting clips’ contents

If you wish to shift all notes and automation in a clip sideways (in the “time” dimension), hold down the ▼▲ knob and turn the ◄► knob. Your clip’s contents will be moved sideways in steps of one square at your current zoom level. If the contents move past either end of the clip, they will wrap around and appear at the other end.

## Clear clip

A clip may have all its notes and automation cleared by holding down the ◄► knob and pressing the back button.
