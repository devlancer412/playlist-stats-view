# Sound Credit Playlists

Playlists are link-based sharing pages which will be served as a one-page application.  Upon opening a link, the application will first receive the amount of authentication required to view.  Once authentication is passed, the application will receive all of the metadata required for display in one payload, after which the content of the page will be largely static.

File opening, downloading, previewing, and playing should all be done in a way that can later be hooked into for analytics and reporting.

## Libraries

Where applicable, the following libraries should be used for consistency with other software:

- React 17
- Redux
- - React-Redux
- - Redux Thunk
- - Redux Persist
- React Router v5
- React Bootstrap
- Axios
- Dart Sass
- Formik
- Wavesurfer JS
- file-saver

## Implementation

### Authentication Check

The first thing the application will receive is information for how much authentication is required.  There are two possible parts:
- login_required: The page requires authentication with a Sound Credit account
- password_required: The page has a unique password that must be provided.

In the event that both are required, account authentication would occur first, and the page password prompt would appear after successful login.  In the event that the user has auth cookies that are still valid, the account authentication modal would be skipped.

```json
{
    "password_required": true,
    "login_required": true
}
```

### Authentication Post

For account authentication, email and a base64-encoded password string must be provided.  If successful, the endpoint would return a token to be stored as a cookie.  For the purpose of this project, allow any valid email in the email field and any string at least 6 characters long to pass the check.

```json
{
    "email": "user@example.com",
    "password": "base64-encoded password string"
}
```

For page login, only a base64-encoded password must be sent.  For the purpose of this project, allow any string at least 6 characters long to pass the check.

```json
{
    "password": "base64-encoded password string"
}
```

### Page Data

Finally, the application will receive its main payload.  This will contain the following information:
- playlist_name: The display name of the playlist, set by the user.
- allow_downloads: A boolean value which should hide all download links if false.
- thumbnail_image_path: The full image path for the album thumbnail to display by the playlist name. May be null.
- header_image_path: The full image path for the header image.  May be null.
- timeout: The time, in minutes, after which the user should be prompted to refresh the page, as file links will be invalidated after this amount of time has passed.
- recordings: An array of objects, containing IDs, names, and artists.  This will be used to provide metadata for files, based on the cloud_recording_id on the file itself, if not null.
- albums: An array of objects, containing IDs, names, and artists.  This will be used to provide metadata for files, based on the cloud_album_id on the file itself, if not null.
- files: An array of objects, representing the files to display.  They will be given in the order that they should appear.  Note that some, but not all, files will have a display_file property, which is identical to the main file structure.  If present, this should be used as a thumbnail or low-quality version where applicable, eg image thumbnails or audio MP3s.

```json
{
    "playlist_name": "My Playlist",
    "allow_downloads": false,
    "thumbnail_image_path": "path/to/thumbnail/image",
    "header_image_path": "path/to/header/image",
    "timeout": 30,
    "recordings": [
        {
            "id": 1,
            "name": "Song 1",
            "artist": "The Musician",
            "album_id": 1
        },
        {
            "id": 2,
            "name": "Song 2",
            "artist": "The Other Musician",
            "album_id": 1
        }
    ],
    "albums": [
        {
            "id": 1,
            "name": "The Album",
            "artist": "A Different Musician"
        }
    ],
    "files": [
        {
            "id": 2,
            "recording_id": 1,
            "album_id": null,
            "display_file_id": 1,
            "path": "path/to/file/2",
            "is_display_file": false,
            "label": 1000,
            "display_file": {
                "id": 1,
                "recording_id": null,
                "album_id": null,
                "display_file_id": null,
                "path": "path/to/file/2/mp3",
                "is_display_file": true,
                "display_file": null
            }
        },
        {
            "id": 3,
            "recording_id": 2,
            "album_id": null,
            "display_file_id": null,
            "path": "path/to/file/3",
            "is_display_file": false,
            "label": 3000,
            "display_file": null
        },
        {
            "id": 5,
            "recording_id": null,
            "album_id": 1,
            "display_file_id": 4,
            "path": "path/to/file/4",
            "is_display_file": false,
            "label": 2000,
            "display_file": {
                "id": 4,
                "recording_id": null,
                "album_id": null,
                "display_file_id": null,
                "path": "path/to/file/4/thumbnail",
                "is_display_file": true,
                "display_file": null
            }
        },
    ]
}
```

#### File Labels

Files have a label field containing an integer value representing what type of file they are.  This field will always be null for display files.  Labels are organized into broad categories which can be used to more easily determine how they should be displayed and what placeholder icons to use for them.  Categories are identified by blocks of 1000 IDs from X000 to X999.  Current labels are:

```
Audio [1000-1999]
1000 - Audio
1001 - 16-Bit Master Audio
1002 - 24-Bit Master Audio
1003 - Pre-Master for Vinyl
1004 - Demo
1005 - Dolby Atmos Master
1006 - Sony 360 Master
1007 - Stem
1008 - Reference Mix
1009 - Approved Mix

Image [2000-2999]
2000 - Image
2001 - Album Art
2002 - Recording Art
2003 - Promotional Art

Video [3000-3999]
3000 - Video
3001 - Music Video
3002 - Production Video

Document [4000-4999]
4000 - Document
4001 - Declaration
4002 - Budget
4003 - Contract
4004 - Mixing Documents

Misc [9000-9999]
9000 - Misc
9001 - Export
```

#### Sample Data

The following sample data should be used for development and testing.  These samples are also available as json files in the `sample_data` directory.

Sample 1
```json
{
    "playlist_name": "Demos",
    "allow_downloads": false,
    "thumbnail_image_path": null,
    "header_image_path": null,
    "timeout": 30,
    "recordings": [
        {
            "id": 1,
            "name": "Sea of Three",
            "artist": "Apple Spice",
            "album_id": null
        },
        {
            "id": 2,
            "name": "Journeying",
            "artist": "Apple Spice",
            "album_id": null
        },
        {
            "id": 3,
            "name": "Middle of the Road",
            "artist": "Apple Spice",
            "album_id": null
        }
    ],
    "albums": [],
    "files": [
        {
            "id": 5,
            "recording_id": 1,
            "album_id": null,
            "display_file_id": 4,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/transcode_test_wav.wav",
            "is_display_file": false,
            "label": 1002,
            "display_file": {
                "id": 4,
                "recording_id": null,
                "album_id": null,
                "display_file_id": null,
                "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/transcode_test_wav-preview.mp3",
                "is_display_file": true,
                "label": null,
                "display_file": null
            }
        },
        {
            "id": 6,
            "recording_id": 2,
            "album_id": null,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/The+Queenstons+-+Figurehead+-+01+Figurehead.mp3",
            "is_display_file": false,
            "label": 1008,
            "display_file": null
        },
        {
            "id": 7,
            "recording_id": 3,
            "album_id": null,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/The+Queenstons+-+Figurehead+-+04+Humanoid.mp3",
            "is_display_file": false,
            "label": 1003,
            "display_file": null
        },
        {
            "id": 8,
            "recording_id": 1,
            "album_id": null,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/AnotherNewWorld.pdf",
            "is_display_file": false,
            "label": 9001,
            "display_file": null
        },
        {
            "id": 9,
            "recording_id": 3,
            "album_id": null,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/The+Queenstons+-+Sensorium+-+cover.png",
            "is_display_file": false,
            "label": 2001,
            "display_file": null
        }
    ]
}
```

Sample 2
```json
{
    "playlist_name": "Catalog Sample",
    "allow_downloads": false,
    "thumbnail_image_path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/sputnik-generic-header-4.jpg",
    "header_image_path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/figurehead_thumbnail.png",
    "timeout": 30,
    "recordings": [
        {
            "id": 10,
            "name": "Roll the Dice",
            "artist": "Shoebody Bops",
            "album_id": 20
        },
        {
            "id": 11,
            "name": "Wall to Wall",
            "artist": "Shoebody Bops",
            "album_id": 20
        },
        {
            "id": 12,
            "name": "Mountaintop Bop",
            "artist": "Francine Flunder and the Wondrous Thunder",
            "album_id": 21
        },
        {
            "id": 13,
            "name": "Springtime",
            "artist": "Francine Flunder and the Wondrous Thunder",
            "album_id": 21
        },
        {
            "id": 14,
            "name": "Austere Waltz",
            "artist": "Cordova Philharmonic Orchestra",
            "album_id": 22
        },
        {
            "id": 15,
            "name": "Basse Dance (op. 36)",
            "artist": "Cordova Philharmonic Orchestra",
            "album_id": 22
        }
    ],
    "albums": [
        {
            "id": 20,
            "name": "Pop Standards",
            "artist": "Shoebody Bops"
        },
        {
            "id": 21,
            "name": "Folk Standards",
            "artist": "Francine Flunder and The Wondrous Thunder"
        },
        {
            "id": 22,
            "name": "Dance Hits of the 1820s",
            "artist": "Cordova Philharmonic Orchestra"
        }
    ],
    "files": [
        {
            "id": 31,
            "recording_id": 10,
            "album_id": null,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/The+Queenstons+-+The+Grand+Cross+-+10+Amber+Starlight+Reveals+The+Sky.mp3",
            "is_display_file": false,
            "label": 1009,
            "display_file": null
        },
        {
            "id": 32,
            "recording_id": 11,
            "album_id": null,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/The+Queenstons+-+The+Revenge+of+Doctor+Q+-+01+Doctor+Q.mp3",
            "is_display_file": false,
            "label": 1004,
            "display_file": null
        },
        {
            "id": 35,
            "recording_id": 12,
            "album_id": null,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/The+Queenstons+-+Figurehead+-+01+Figurehead.mp3",
            "is_display_file": false,
            "label": 1002,
            "display_file": null
        },
        {
            "id": 36,
            "recording_id": 13,
            "album_id": null,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/The+Queenstons+-+Figurehead+-+04+Humanoid.mp3",
            "is_display_file": false,
            "label": 1001,
            "display_file": null
        },
        {
            "id": 38,
            "recording_id": 14,
            "album_id": null,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/The+Queenstons+-+The+Grand+Cross+-+10+Amber+Starlight+Reveals+The+Sky.mp3",
            "is_display_file": false,
            "label": 1000,
            "display_file": null
        },
        {
            "id": 40,
            "recording_id": 15,
            "album_id": null,
            "display_file_id": 39,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/transcode_test_wav.wav",
            "is_display_file": false,
            "label": 1003,
            "display_file": {
                "id": 39,
                "recording_id": null,
                "album_id": null,
                "display_file_id": null,
                "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/transcode_test_wav-preview.mp3",
                "is_display_file": true,
                "display_file": null
            }
        },
        {
            "id": 30,
            "recording_id": null,
            "album_id": 20,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/The+Queenstons+-+The+Grand+Cross+-+cover.png",
            "is_display_file": false,
            "label": 2001,
            "display_file": null
        },
        {
            "id": 34,
            "recording_id": null,
            "album_id": 21,
            "display_file_id": 33,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/figurehead.jpg",
            "is_display_file": false,
            "label": 2001,
            "display_file": {
                "id": 33,
                "recording_id": null,
                "album_id": null,
                "display_file_id": null,
                "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/figurehead_thumbnail.png",
                "is_display_file": true,
                "display_file": null
            }
        },
        {
            "id": 37,
            "recording_id": null,
            "album_id": 22,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/The+Queenstons+-+Sensorium+-+cover.png",
            "is_display_file": false,
            "label": 2001,
            "display_file": null
        }
    ]
}
```

Sample 3
```json
{
    "playlist_name": "Release Masters",
    "allow_downloads": true,
    "thumbnail_image_path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/sputnik-generic-header-4.jpg",
    "header_image_path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/figurehead_thumbnail.png",
    "timeout": 30,
    "recordings": [
        {
            "id": 100,
            "name": "Lead Single",
            "artist": "The Aspirants",
            "album_id": 200
        },
        {
            "id": 101,
            "name": "Superior B-Side",
            "artist": "The Aspirants",
            "album_id": 200
        },
        {
            "id": 102,
            "name": "Forgotten Thirds",
            "artist": "The Aspirants",
            "album_id": 200
        },
        {
            "id": 103,
            "name": "Sleeper Hit",
            "artist": "The Aspirants",
            "album_id": 200
        }
    ],
    "albums": [
        {
            "id": 200,
            "name": "Upcoming Album",
            "artist": "The Aspirants"
        }
    ],
    "files": [
        {
            "id": 305,
            "recording_id": 100,
            "album_id": null,
            "display_file_id": 304,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/transcode_test_wav.wav",
            "is_display_file": false,
            "label": 1001,
            "display_file": {
                "id": 304,
                "recording_id": null,
                "album_id": null,
                "display_file_id": null,
                "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/transcode_test_wav-preview.mp3",
                "is_display_file": true,
                "display_file": null
            }
        },
        
        {
            "id": 307,
            "recording_id": 101,
            "album_id": null,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/The+Queenstons+-+Figurehead+-+01+Figurehead.mp3",
            "is_display_file": false,
            "label": 1002,
            "display_file": null
        },
        {
            "id": 308,
            "recording_id": 102,
            "album_id": null,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/The+Queenstons+-+Figurehead+-+04+Humanoid.mp3",
            "is_display_file": false,
            "label": 1005,
            "display_file": null
        },
        {
            "id": 309,
            "recording_id": 103,
            "album_id": null,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/The+Queenstons+-+The+Grand+Cross+-+10+Amber+Starlight+Reveals+The+Sky.mp3",
            "is_display_file": false,
            "label": 1008,
            "display_file": null
        },
        {
            "id": 301,
            "recording_id": null,
            "album_id": 200,
            "display_file_id": 300,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/figurehead.jpg",
            "is_display_file": false,
            "label": 2003,
            "display_file": {
                "id": 300,
                "recording_id": null,
                "album_id": null,
                "display_file_id": null,
                "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/figurehead_thumbnail.png",
                "is_display_file": true,
                "display_file": null
            }
        },
        {
            "id": 302,
            "recording_id": null,
            "album_id": 200,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/AnotherNewWorld.pdf",
            "is_display_file": false,
            "label": 4003,
            "display_file": null
        },
        {
            "id": 303,
            "recording_id": null,
            "album_id": 200,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/eOdO8lR.mp4",
            "is_display_file": false,
            "label": 3002,
            "display_file": null
        },
        {
            "id": 306,
            "recording_id": 100,
            "album_id": null,
            "display_file_id": null,
            "path": "https://sharelist-dummy-files.s3.us-west-2.amazonaws.com/The+Queenstons+-+Sensorium+-+cover.png",
            "is_display_file": false,
            "label": 2002,
            "display_file": null
        },
        {
            "id": 310,
            "recording_id": 103,
            "album_id": null,
            "display_file_id": null,
            "path": "https://s3.console.aws.amazon.com/s3/object/sharelist-dummy-files?region=us-west-2&prefix=5E_CharacterSheet_Fillable.pdf",
            "is_display_file": false,
            "label": 4002,
            "display_file": null
        }
    ]
}
```
