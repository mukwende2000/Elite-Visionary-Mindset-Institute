import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import FormField from "../../pages/Apply/component/FormFields";
import styles from "./AcademicStep.module.css";

function AcademicStep({ register, errors }) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const { data, error } = await supabase
                .from("courses")
                .select("id, title")
                .eq("is_active", true)
                .order("title");

            if (error) {
                console.error("Failed to load courses:", error);
                return;
            }

            setCourses(data);
        };

        fetchCourses();
    }, []);

    return (
        <div className={styles.grid}>

            <FormField
                label="Highest Level of Education"
                required
                error={errors.highestQualification?.message}
                formElement="select"
                fieldProps={register("highestQualification", {
                    required: "This field is required",
                })}
            >
                <option value="">Select Education Level</option>
                <option value="secondary">Secondary School</option>
                <option value="certificate">Certificate</option>
                <option value="diploma">Diploma</option>
                <option value="degree">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="doctorate">Doctorate</option>
                <option value="other">Other</option>
            </FormField>

            <FormField
                label="Current Occupation"
                required
                error={errors.currentOccupation?.message}
                formElement="input"
                type="text"
                placeholder="e.g. Software Developer"
                fieldProps={register("currentOccupation", {
                    required: "This field is required",
                })}
            />

            <FormField
                label="Name of School/College/University"
                formElement="input"
                type="text"
                placeholder="Name of institution"
                fieldProps={register("institution")}
            />

            <FormField
                label="Choose a Programme"
                required
                error={errors.programme?.message}
                formElement="select"
                className={styles.fullWidth}
                fieldProps={register("programme", {
                    required: "This field is required",
                })}
            >
                <option value="">Select Programme</option>

                {courses.map((course) => (
                    <option key={course.id} value={course.title}>
                        {course.title}
                    </option>
                ))}
            </FormField>

            <FormField
                label="Preferred Study Mode"
                required
                error={errors.studyMode?.message}
                formElement="select"
                fieldProps={register("studyMode", {
                    required: "This field is required",
                })}
            >
                <option value="">Select Study Mode</option>
                <option value="online">Online</option>
                <option value="physical">Physical</option>
                <option value="hybrid">Hybrid</option>
            </FormField>

            <FormField
                label="Preferred Intake"
                required
                error={errors.intake?.message}
                formElement="select"
                fieldProps={register("intake", {
                    required: "Please select your preferred intake",
                })}
            >
                <option value="">Select Intake</option>
                <option value="january">January</option>
                <option value="april">April</option>
                <option value="september">September</option>
            </FormField>

        </div>
    );
}

export default AcademicStep;
