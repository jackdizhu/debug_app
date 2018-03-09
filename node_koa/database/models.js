
module.exports = {
  user: {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    ext: {
      type: Object
    }
  },
  project: {
    name: {
      type: String,
      required: true
    },
    msg: {
      type: String,
      required: true
    },
    mapFile: {
      type: String
    },
    key: {
      type: String
    }
  },
  projectErrorInfo: {
    projectId: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    msg: {
      type: String,
      required: true
    },
    mapFile: {
      type: String
    },
    code: {
      type: String
    }
  }
}
