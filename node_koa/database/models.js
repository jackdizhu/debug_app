
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
    date: {
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
    user_id: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    msg: {
      type: String
    },
    filename: {
      type: String
    },
    line: {
      type: Number
    },
    column: {
      type: Number
    },
    mapFile: {
      type: String
    },
    mapFileUrl: {
      type: String
    },
    key: {
      type: String
    }
  },
  file: {
    name: {
      type: String,
      required: true
    },
    nowName: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
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
      type: String
    },
    mapFile: {
      type: String
    },
    code: {
      type: String
    }
  }
}
