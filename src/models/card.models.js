import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLenght: 1,
    maxLenght: 120,
  },
  body: {
    type: String,
    required: true,
  },
  hashtags: [
    {
      type: String,
    },
  ],
  img: {
    type: String,
    trim: true,
  },
  reactions: {
    type: Number,
    required: true,
    default: 0,
  },
  readingTime: {
    type: Number,
    required: true,
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

const Card = mongoose.model("cards", cardSchema);

export { Card };

/*

user: 
- Name
- Lastname
- BirthDate
- ZipCode
- Level ["beg", "inter", "expert"]
- Friends [ id_users ]
- FriendsRequests [ id_friendsRequests ]
- CreatedAt: date
- UpdatedAt: date
- RacesCreated: [id_races]
- RacesRequests: [ id_RaceRequests ]

Race:
- Title
- Description
- User : id_user
- Location
- ZipCode (checar con api)
- Level
- Km
- Date
- hour
- CreatedAt: date
- UpdatedAt: date
- Status ["Finished", "Scheduled"]
- comments [ id_comment ]
- Rating
- Assistants [ id_users ]


cron job.
indexación (modelo)
bucket ds3
google maps
mapbox - https://www.mapbox.com/

Comments:
- Race: id_race
- User: id_user
- Text
- Image: url del bucket (string)
- Rate
- CreatedAt: date
- UpdatedAt: date

RaceRequests:
- Race: id_race
- User: id_user
- Status: ["Approved", "Pending", "Rejected"]

FriendRequests:
- userRequester: id_user
- userResponder: id_user
- Status: ["Approved", "Pending", "Rejected"]






*/
