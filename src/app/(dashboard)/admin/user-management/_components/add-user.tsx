// import Select from "@/app/test/input/_components/select";
// import Input from "@/components/global/input";
// import { Modal } from "@/components/global/modal";
// import React, { useState } from "react";
// import { z } from "zod";

// interface AddUserProps {
//   onOpenChange: (open: boolean) => void;
//   open: boolean;
// }

// // Zod schema for form validation
// const countryOptions= [
//    { label:"USA", value:"USA"},
//    { label:"India", value: "India"}
// ]

// const roleOptions =[
//     {label: "Support", value: "FYNDR_SUPPORT"},
//     {label: "Manager", value:"FYNDR_MANAGER"},
//     {label: "Super Admin", value:"SUPER_ADMIN"}
// ]
// const addUserSchema = z.object({
//   firstName: z.string().min(1, "First name is required"),
//   lastName: z.string().min(1, "Last name is required"),
//   email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
//   phone: z.string().optional().refine((val) => !val || /^\+?[\d\s\-\(\)]+$/.test(val), {
//     message: "Please enter a valid phone number"
//   }),
//   role: z.enum(["SUPER_ADMIN", "FYNDR_MANAGER", "FYNDR_SUPPORT"], {
//     errorMap: () => ({ message: "Please select a valid role" })
//   }),
//   password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters")
// });

// type AddUserFormData = z.infer<typeof addUserSchema>;

// const AddUser = ({ onOpenChange, open }: AddUserProps) => {
//   const [formData, setFormData] = useState<AddUserFormData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     role: "" as any,
//     password: ""
//   });

//   const [errors, setErrors] = useState<Partial<Record<keyof AddUserFormData, string>>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error for this field when user starts typing
//     if (errors[name as keyof AddUserFormData]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: undefined
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrors({});

//     try {
//       const validatedData = addUserSchema.parse(formData);
      
//       // Handle form submission here
//       console.log("Form submitted:", validatedData);
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Close modal after successful submission
//       onOpenChange(false);
      
//       // Reset form
//       setFormData({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         role: "" as any,
//         password: ""
//       });
      
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         // Handle validation errors
//         const fieldErrors: Partial<Record<keyof AddUserFormData, string>> = {};
//         error.errors.forEach((err) => {
//           if (err.path[0]) {
//             fieldErrors[err.path[0] as keyof AddUserFormData] = err.message;
//           }
//         });
//         setErrors(fieldErrors);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Modal onOpenChange={onOpenChange} open={open} title="Add User">
//       <div>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//                 <Input label="First Name" />
//             </div>

//              <div className="space-y-2">
//                 <Input label="Last Name" />
//             </div>

//             <div className="space-y-2">
//                 <Select options={countryOptions} />
//             </div>

//             <div className="space-y-2">
//                 <Input label="Zip code" />
//             </div>

//             <div className="space-y-2">
//                 <Input label="Country Code" />
//             </div>

//             <div className="space-y-2">
//                 <Input label="Phone number" />
//             </div>

//             <div className="space-y-2">
//                 <Input label="Address" />
//             </div>

//             <div className="space-y-2">
//                 <Input label="Street" />
//             </div>

//             <div className="space-y-2">
//                 <Input label="State" />
//             </div>
//             <div className="space-y-2">
//                 <Input label="City" />
//             </div>

//             <div className="space-y-2">
//                 <Input label="Email" type="email" />
//             </div>

//             <div className="space-y-2">
//                 <Input label="Password" type="password" />
//             </div>

//              <div className="space-y-2">
//                 <Select options={roleOptions} />
//             </div>

//           </div>

//           {/* Form Actions */}
//           <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">

//             <button
//               type="submit"
//               className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default AddUser;


import Select from "@/app/test/input/_components/select";
import Input from "@/components/global/input";
import { Modal } from "@/components/global/modal";
import React, { useState } from "react";
import { z } from "zod";

interface AddUserProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

// Options for dropdowns
const countryOptions = [
  { label: "USA", value: "USA" },
  { label: "India", value: "India" }
];

const roleOptions = [
  { label: "Support", value: "FYNDR_SUPPORT" },
  { label: "Manager", value: "FYNDR_MANAGER" },
  { label: "Super Admin", value: "SUPER_ADMIN" }
];

// Zod schema converted from Yup (RegisterFormAdmin)
const addUserSchema = z.object({
  fname: z.string().min(1, "First Name can't be blank"),
  lname: z.string().min(1, "Last Name can't be blank"),
  email: z
    .string()
    .min(1, "Please enter a valid email address")
    .email("Please enter a valid email address")
    .regex(/@(nucleusteq\.com|fyndr\.us)$/, "Email domain should be nucleusteq.com or fyndr.us"),
  website: z
    .string()
    .regex(
      /^((?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+)?$/,
      "Please enter a valid URL"
    )
    .optional()
    .or(z.literal("")),
  addOnUrl: z.string().optional(),
  taxNumber: z
    .string()
    .regex(/^([0-9]{2}-[0-9]{7})?$/, "Valid format is NN-NNNNNNN")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(1, "Phone Number can't be blank").max(10)
    .regex(/^[0-9]{10}$/, "Phone Number must be 10 digits"),
  postalcode: z
    .string()
    .min(1, "Zip code can't be blank")
    .max(6, "Maximum 6 characters are allowed"),
  address: z.string().optional(),
  street: z.string().optional(),
  city: z.string().min(1, "City can't be blank, enter valid postal code"),
  state: z.string().min(1, "State can't be blank, enter valid postal code"),
  ctryCode: z
    .string()
    .min(1, "Country Code can't be blank")
    .regex(/^\+[0-9]{1,3}$/, "Country Code is not valid"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["SUPER_ADMIN", "FYNDR_MANAGER", "FYNDR_SUPPORT"], {
    errorMap: () => ({ message: "Please select a valid role" })
  }),
  country: z.string().min(1, "Please select a country")
});

type AddUserFormData = z.infer<typeof addUserSchema>;

const AddUser = ({ onOpenChange, open }: AddUserProps) => {
  const [formData, setFormData] = useState<AddUserFormData>({
    fname: "",
    lname: "",
    email: "",
    website: "",
    addOnUrl: "",
    taxNumber: "",
    phone: "",
    postalcode: "",
    address: "",
    street: "",
    city: "",
    state: "",
    ctryCode: "",
    password: "",
    role: "" as any,
    country: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AddUserFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof AddUserFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user makes selection
    if (errors[name as keyof AddUserFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = addUserSchema.parse(formData);
      
      console.log("Form submitted:", validatedData);
      
      
      onOpenChange(false);
      
      setFormData({
        fname: "",
        lname: "",
        email: "",
        website: "",
        addOnUrl: "",
        taxNumber: "",
        phone: "",
        postalcode: "",
        address: "",
        street: "",
        city: "",
        state: "",
        ctryCode: "",
        password: "",
        role: "" as any,
        country: ""
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: Partial<Record<keyof AddUserFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof AddUserFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal onOpenChange={onOpenChange} open={open} title="Add User">
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2  bg-primary">
              <Input 
                label="First Name" 
                name="fname"
                value={formData.fname}
                onChange={handleInputChange}
              />
              {errors.fname && <p className="text-sm text-red-600">{errors.fname}</p>}
            </div>

            <div className="space-y-2">
              <Input 
                label="Last Name" 
                name="lname"
                value={formData.lname}
                onChange={handleInputChange}
              />
              {errors.lname && <p className="text-sm text-red-600">{errors.lname}</p>}
            </div>

            <div className="space-y-2">
              <Select 
                options={countryOptions} 
                label="Country"
                name="country"
                value={formData.country}
                onValueChange={(value) => handleSelectChange("country", value)}
              />
              {errors.country && <p className="text-sm text-red-600">{errors.country}</p>}
            </div>

            <div className="space-y-2">
              <Input 
                label="Zip code" 
                name="postalcode"
                value={formData.postalcode}
                onChange={handleInputChange}
              />
              {errors.postalcode && <p className="text-sm text-red-600">{errors.postalcode}</p>}
            </div>

            <div className="space-y-2">
              <Input 
                label="Country Code" 
                name="ctryCode"
                value={formData.ctryCode}
                onChange={handleInputChange}
                placeholder="+1"
              />
              {errors.ctryCode && <p className="text-sm text-red-600">{errors.ctryCode}</p>}
            </div>

            <div className="space-y-2">
              <Input 
                label="Phone number" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Input 
                label="Address" 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
            </div>

            <div className="space-y-2">
              <Input 
                label="Street" 
                name="street"
                value={formData.street}
                onChange={handleInputChange}
              />
              {errors.street && <p className="text-sm text-red-600">{errors.street}</p>}
            </div>

            <div className="space-y-2">
              <Input 
                label="State" 
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
              {errors.state && <p className="text-sm text-red-600">{errors.state}</p>}
            </div>

            <div className="space-y-2">
              <Input 
                label="City" 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
              {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
            </div>

            <div className="space-y-2">
              <Input 
                label="Email" 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Input 
                label="Password" 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Select 
                options={roleOptions} 
                label="Role"
                name="role"
                value={formData.role}
                onValueChange={(value) => handleSelectChange("role", value)}
              />
              {errors.role && <p className="text-sm text-red-600">{errors.role}</p>}
            </div>

          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddUser;