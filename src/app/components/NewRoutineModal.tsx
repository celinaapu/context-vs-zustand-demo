"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Calendar, Clock, X } from "lucide-react";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NewRoutineModalProps } from "../../type/type";
import ImageUpload from "./ImageUpload";

const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const CLOUDINARY_CLOUD_NAME = "celina";

const timeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;

const routineSchema = z
  .object({
    title: z.string().min(1, "Routine title is required"),
    date: z.string().min(1, "Date is required"),
    startTime: z
      .string()
      .min(1, "Start time is required")
      .regex(timeRegex, "Invalid start time format (HH:MM)"),
    endTime: z
      .string()
      .min(1, "End time is required")
      .regex(timeRegex, "Invalid end time format (HH:MM)"),
    illustration: z.string().url("Please upload a valid illustration file"),
    illustrationType: z.enum(["image", "video"]),
  })
  .refine(
    (data) =>
      data.startTime && data.endTime ? data.startTime < data.endTime : true,
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

type RoutineFormData = z.infer<typeof routineSchema>;

const NewRoutineModal: FC<NewRoutineModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<RoutineFormData>({
    resolver: zodResolver(routineSchema),
    defaultValues: {
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      illustration: "",
      illustrationType: "image",
    },
    mode: "onTouched",
  });

  const illustrationType = watch("illustrationType");
  const illustrationUrl = watch("illustration");

  const [mediaUploadError, setMediaUploadError] = useState<
    string | undefined
  >();
  const [currentTime, setCurrentTime] = useState(new Date());
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedCurrentTimeDisplay = useMemo(
    () =>
      currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [currentTime]
  );

  const formattedCurrentTimeInput = useMemo(
    () => currentTime.toTimeString().slice(0, 5),
    [currentTime]
  );

  const handleTimeClick = (field: "startTime" | "endTime") => {
    setValue(field, formattedCurrentTimeInput, { shouldValidate: true });
  };

  const handleMediaChange = (url: string | string[]) => {
    const newUrl = Array.isArray(url) ? url[0] : url;
    setValue("illustration", newUrl || "", { shouldValidate: true });

    if (newUrl) {
      clearErrors("illustration");
      setMediaUploadError(undefined);
    } else {
      setError("illustration", {
        type: "manual",
        message: "Please upload an illustration.",
      });
    }
  };

  const handleMediaErrorClear = () => {
    setMediaUploadError(undefined);
    clearErrors("illustration");
  };

  const onSubmit = (data: RoutineFormData) => {
    const timeRange = `${data.startTime} - ${data.endTime}`;
    onSave({
      title: data.title,
      timeRange,
      illustration: data.illustration,
      illustrationType: data.illustrationType,
    });
    closeModalAndReset();
  };

  const closeModalAndReset = () => {
    reset();
    setMediaUploadError(undefined);
    onClose();
  };

  if (!open) return null;

  const finalIllustrationError =
    errors.illustration?.message || mediaUploadError;
  
  return (
    <div className="fixed inset-0 bg-white/60 w-full flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Routine
            </h2>
            <button
              onClick={closeModalAndReset}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Routine Title
              </label>
              <input
                {...register("title")}
                id="title"
                type="text"
                placeholder="e.g., Morning Workout"
                className={`w-full px-4 py-3 border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date
              </label>
              <div
                className="relative cursor-pointer"
                onClick={() => dateInputRef.current?.showPicker()}
              >
                <Calendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
                <input
                  {...register("date")}
                  ref={dateInputRef}
                  id="date"
                  type="date"
                  value={watch("date") || ""}
                  onChange={(e) =>
                    setValue("date", e.target.value, { shouldValidate: true })
                  }
                  className={`w-full pl-10 pr-4 py-3 border ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black`}
                />
              </div>
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(["startTime", "endTime"] as const).map((field) => (
                  <div key={field} className="relative">
                    <Clock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={18}
                    />
                    <input
                      {...register(field)}
                      id={field}
                      type="time"
                      value={watch(field) || ""}
                      onChange={(e) =>
                        setValue(field, e.target.value, {
                          shouldValidate: true,
                        })
                      }
                      className={`w-full pl-10 pr-4 py-3 border ${
                        errors[field] ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black`}
                    />
                    <button
                      type="button"
                      onClick={() => handleTimeClick(field)}
                      className="absolute right-0 top-0 h-full px-3 text-xs text-blue-600 hover:text-blue-800"
                    >
                      Now
                    </button>
                  </div>
                ))}
              </div>
              {(errors.startTime || errors.endTime) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startTime?.message || errors.endTime?.message}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                ⏱ Current Time: {formattedCurrentTimeDisplay}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Media Type
              </label>
              <div className="flex gap-3 mb-4">
                {(["image", "video"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setValue("illustrationType", type);
                      setValue("illustration", "");
                      handleMediaErrorClear();
                    }}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all font-medium text-sm ${
                      illustrationType === type
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <ImageUpload
                value={illustrationUrl}
                onChange={handleMediaChange}
                uploadPreset={CLOUDINARY_UPLOAD_PRESET}
                cloudName={CLOUDINARY_CLOUD_NAME}
                type={illustrationType}
                multiple={false}
                error={finalIllustrationError}
                onErrorClear={handleMediaErrorClear}
              />

              {finalIllustrationError && (
                <p className="text-red-500 text-sm mt-1 font-medium">
                  <AlertTriangle size={14} className="inline mr-1" />
                  {finalIllustrationError}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={closeModalAndReset}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  (!!illustrationUrl && !!finalIllustrationError)
                }
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
              >
                {isSubmitting ? "Creating..." : "Create Routine"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRoutineModal;
