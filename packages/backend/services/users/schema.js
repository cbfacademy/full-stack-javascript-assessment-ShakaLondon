import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    childsName: {
        type: String,
        required: true,
      },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    childDateOfBirth: {
        type: Date,
        required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assets",
      // default: "https://ui-avatars.com/api/?name=Unnamed+User",
    },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "User"],
      default: "User",
    },
    gameRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserGames",
      },
    ],
  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
);

UserSchema.pre("save", async function (done) {
  // this.avatar = `https://ui-avatars.com/api/?name=${this.name}+${this.surname}`;
  // hash password
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  done();
});

UserSchema.methods.toJSON = function () {

  const userDocument = this;

  const docObject = userDocument.toObject();

  delete docObject.password;
  delete docObject.__v;

  return docObject;
};

UserSchema.statics.findByCredentials = async function (email, password) {

  const userDocument = this;

  const user = await userDocument.findOne({ email });

  if (user) {
    const userVerified = await bcrypt.compare(password, user.password);

    if (userVerified) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export default model("Users", UserSchema);