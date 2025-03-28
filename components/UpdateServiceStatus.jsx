// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import { Colors } from '@/constants/Colors';
// import { MaterialIcons } from '@expo/vector-icons';
// import { Picker } from '@react-native-picker/picker';
// import http_request from "../http_request";

// export default function UpdateServiceStatus({ isVisible, onClose, RefreshData, service }) {

//   const { control, handleSubmit, setValue } = useForm();

//   useEffect(() => {
//     if (service) {
//         setValue("status", service?.status);
//     }
//   }, [service]);

//   const onSubmit = async (data) => {
//     try {
//       let response = await http_request.patch(`/editComplaint/${service?._id}`, data);
//       let { data: responseData } = response;
//       RefreshData(responseData);
//       onClose();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <Modal visible={isVisible} onBackdropPress={onClose} transparent={true} animationType="slide">
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <View style={styles.headerContainer}>
//             <Text style={styles.header}>Update Status</Text>
//             <TouchableOpacity onPress={onClose}>
//               <MaterialIcons name="close" size={24} color={Colors.GRAY} />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.form}>
//             <Controller
//               control={control}
//               name="status"
//               render={({ field: { onChange, value } }) => (
//                 <View style={styles.inputContainer}>
//                   <Text style={styles.label}>Status</Text>
//                   <Picker
//                     selectedValue={value}
//                     style={styles.picker}
//                     onValueChange={onChange}
//                   >
//                     <Picker.Item label="In Progress" value="IN PROGRESS" />
//                     <Picker.Item label="Awaiting Parts" value="PART PENDING" />
//                     <Picker.Item label="Assign" value="ASSIGN" />
//                     <Picker.Item label="Completed" value="COMPLETED" />
//                     <Picker.Item label="Canceled" value="CANCELED" />
//                   </Picker>
//                 </View>
//               )}
//             />

//             <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
//               <Text style={styles.submitButtonText}>Submit</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '90%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   form: {
//     width: '100%',
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   picker: {
//     height: 50,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 4,
//   },
//   submitButton: {
//     backgroundColor: Colors.PRIMARY,
//     paddingVertical: 12,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Image, ActivityIndicator,
  Alert
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

export default function UpdateServiceStatus({ isVisible, onClose, RefreshData, service }) {
  const { control, handleSubmit, setValue, watch, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setValue("status", service?.status);
      // setValue("comments", service?.comments || "");
    }
  }, [service]);

  // Function to pick an image from the gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'You need to allow access to the gallery.');
    return;
  }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]); // Store the selected image
    }
  };

  // Handle Form Submission
  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = new FormData();
      data.append('status', formData.status);
      data.append('comments', formData.comments);
      // data.append('id', service?._id);

      // Append Image if selected
      if (selectedImage) {
        data.append('partPendingImage', {
          uri: selectedImage.uri,
          name: selectedImage.fileName || `image_${Date.now()}.jpg`,
          type: 'image/jpeg',
        });
      }

      // console.log("Submitting Data:", data);`/updateComplaintWithImage/${id}`

      const response = await fetch(`https://crm-backend-weld-pi.vercel.app/updateComplaintWithImage/${service?._id}`, {
        method: 'PATCH',
        body: data, // FormData automatically sets correct headers
      });

      const result = await response.json();
      console.log('Success:', result);

      if (result.status===true) {
        Toast.show({
          type: 'success',
          text1: 'Success!',
          text2: 'Service status updated successfully.',
          position: 'top',
          visibilityTime: 4000,
        });
        Alert.alert('Success', 'Service status has been updated!', [
          { text: 'OK', onPress: () => onClose() }
        ]);
        reset()
        setSelectedImage(null)
        RefreshData(result); // Refresh Data After Successful Update
        onClose(); // Close Modal
      }
    } catch (error) {
      console.error('Error in submission:', error);
      onClose();
    } finally {
      onClose();
      reset()
      setSelectedImage(null)
      setLoading(false);
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Update Status</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={Colors.GRAY} />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            {/* Status Picker */}
            <Controller
              control={control}
              name="status"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Status</Text>
                  <Picker selectedValue={value} style={styles.picker} onValueChange={onChange}>
                    <Picker.Item label="In Progress" value="IN PROGRESS" />
                    <Picker.Item label="Awaiting Parts" value="PART PENDING" />
                    <Picker.Item label="Assign" value="ASSIGN" />
                    <Picker.Item label="Completed" value="FINAL VERIFICATION" />
                    <Picker.Item label="Canceled" value="CANCELED" />
                  </Picker>
                </View>
              )}
            />

            {/* Comments Field */}
            <Controller
              control={control}
              name="comments"
              rules={{
                required: 'Comments are required',
                minLength: { value: 10, message: 'Must be at least 10 characters' },
                maxLength: { value: 500, message: 'Cannot exceed 500 characters' },
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Comments/Notes</Text>
                  <TextInput
                    style={styles.textArea}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={4}
                    placeholder="Enter comments..."
                  />
                  {error && <Text style={styles.errorText}>{error.message}</Text>}
                </View>
              )}
            />

            {/* Image Upload */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Upload Image</Text>
              <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
                <Text style={styles.imageUploadText}>Select Image</Text>
              </TouchableOpacity>
              {selectedImage && <Image source={{ uri: selectedImage.uri }} style={styles.imagePreview} />}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, loading && styles.disabledButton]}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  imageUploadButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  imageUploadText: {
    color: 'white',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
});
