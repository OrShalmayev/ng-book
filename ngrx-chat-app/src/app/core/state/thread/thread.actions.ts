import { IThread } from "@models/thread.model";
import { createActionGroup, props } from "@ngrx/store";
import { EStateFeatures } from "../app/app.types";

export const threadActions = createActionGroup({
    source: EStateFeatures.Threads,
    events: {
        'Add': props<{thread: IThread}>(),
    }
})