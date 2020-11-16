// The Experience schema.
import Experience from "../../../schema/Experience";

export default {
    Query: {
        experience: (root, args) => {
            return new Promise((resolve, reject) => {
                Experience.findOne(args).exec((err, res) => {
                err ? reject(err) : resolve(res);
                });
            });
        },
        experiences: () => {
            return new Promise((resolve, reject) => {
                Experience.find({})
                .populate()
                .exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        }
    },
};