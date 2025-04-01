// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     Button,
//     FlatList,
//     Modal,
//     TextInput,
//     StyleSheet,
//     ActivityIndicator,
//     Alert,
// } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';

// import http_request from '../http_request';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const TransactionList = ({ data, RefreshData, wallet, bankDetails, loading, value }) => {


//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [amount, setAmount] = useState('');

//     const { control, handleSubmit, formState: { errors } } = useForm();

//     const handleWallet = async () => {
//         try {
//             const resData = {
//                 serviceCenterId: value?._id,
//                 serviceCenterName: value?.name,
//                 contact: +(value?.contact),
//                 email: value?.email,
//                 accountHolderName: bankDetails?.accountHolderName,
//                 bankDetailId: bankDetails?._id,
//                 ifsc: bankDetails?.IFSC,
//                 accountNumber: bankDetails?.accountNumber,
//             };
//             // console.log(resData);
//             const response = await http_request.post("/addWallet", resData);
//             const { data } = response;

//             RefreshData(data);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const handleDuePayment = async (data) => {
//         try {
//             let centerData = await AsyncStorage.getItem('user');
//             let centerInfo = JSON.parse(centerData);

//             const serviceCenterPayInfo = {
//                 account_number: adminBankDtl?.account_number,
//                 amount: data?.amount * 100,
//                 currency: "INR",
//                 mode: "NEFT",
//                 purpose: "payout",
//                 fund_account: {
//                     account_type: "bank_account",
//                     bank_account: {
//                         name: bankDetails?.accountHolderName,
//                         ifsc: bankDetails?.IFSC,
//                         account_number: bankDetails?.accountNumber,
//                     },
//                     contact: {
//                         name: centerInfo?.user?.serviceCenterName,
//                         email: centerInfo?.user?.email,
//                         contact: centerInfo?.user?.contact,
//                         type: "employee",
//                         reference_id: "12345",
//                         notes: {
//                             notes_key_1: "Tea, Earl Grey, Hot",
//                             notes_key_2: "Tea, Earl Grey… decaf.",
//                         },
//                     },
//                 },
//                 queue_if_low_balance: true,
//                 reference_id: "Acme Transaction ID 12345",
//                 narration: "Acme Corp Fund Transfer",
//                 notes: {
//                     notes_key_1: "Beam me up Scotty",
//                     notes_key_2: "Engage",
//                 },
//             };

//             let response = await http_request.post(`/serviceCenterDuePayment`, serviceCenterPayInfo);
//             let { data } = response;
//             setIsModalOpen(false);
//             RefreshData(data);

//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const onSubmit = (data) => {
//         if (bankDetails) {
//             handleDuePayment(data);
//         } else {
//             Alert.alert("Error", "Please add bank details");
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {loading ? (
//                 <ActivityIndicator size="large" color="#0000ff" />
//             ) : (
//                 <View>
//                     {value?.user?.role === "ADMIN" ? null : (
//                         <View style={styles.walletContainer}>
//                             {wallet ? (
//                             <>
//                                 <View style={styles.walletInfo}>
//                                     <Text style={styles.walletTitle}>Wallet</Text>
//                                     <View style={styles.walletBalance}>
//                                         <Text style={styles.walletLabel}>Wallet Balance</Text>
//                                         <Text style={styles.walletAmount}>{wallet?.dueAmount}</Text>
//                                     </View>
//                                     <View style={styles.walletBalance}>
//                                         <Text style={styles.walletLabel}>Total Commissions</Text>
//                                         <Text style={styles.walletAmount}>{wallet?.totalCommission}</Text>
//                                     </View>
//                                     <Button title="Withdrawal" onPress={() => { setIsModalOpen(true); setAmount(wallet?.dueAmount); }} />


//                                 </View>
//                                 <View>
//                                     <Text style={styles.title}>Bank Transactions List</Text>

//                                     <FlatList
//                                         data={data}
//                                         keyExtractor={(item) => item.id.toString()}
//                                         renderItem={({ item, index }) => (
//                                             <View style={styles.transactionRow}>
//                                                 <Text>{index + 1}</Text>
//                                                 <Text>{item.userName}</Text>
//                                                 <Text>{item.paidAmount} INR</Text>
//                                                 <Text>{new Date(item.createdAt).toLocaleString()}</Text>
//                                             </View>
//                                         )}
//                                     />
//                                 </View>
//                             </>
//                             ) : (
//                                 <Button title="Activate Wallet" onPress={handleWallet} />
//                             )}  
//                         </View>
//                     )}



//                     <Modal
//                         visible={isModalOpen}
//                         transparent
//                         animationType="slide"
//                         onRequestClose={() => setIsModalOpen(false)}
//                     >
//                         <View style={styles.modalContainer}>
//                             <View style={styles.modalContent}>
//                                 <Text style={styles.modalTitle}>Add Amount</Text>
//                                 <Controller
//                                     control={control}
//                                     name="amount"
//                                     rules={{ required: 'Amount is required' }}
//                                     render={({ field: { onChange, onBlur, value } }) => (
//                                         <TextInput
//                                             style={styles.input}
//                                             keyboardType="numeric"
//                                             placeholder="Amount"
//                                             onBlur={onBlur}
//                                             onChangeText={onChange}
//                                             value={value}
//                                         />
//                                     )}
//                                 />
//                                 {errors.amount && <Text style={styles.errorText}>{errors.amount.message}</Text>}
//                                 <View style={styles.modalButtons}>
//                                     <Button title="Cancel" onPress={() => setIsModalOpen(false)} />
//                                     <Button title="Withdrawal Amount" onPress={handleSubmit(onSubmit)} />
//                                 </View>
//                             </View>
//                         </View>
//                     </Modal>
//                 </View>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     walletContainer: {
//         marginBottom: 16,
//     },
//     walletInfo: {
//         backgroundColor: '#e0f7fa',
//         borderRadius: 8,
//         padding: 16,
//         marginBottom: 16,
//     },
//     walletTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     walletBalance: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginVertical: 8,
//     },
//     walletLabel: {
//         fontSize: 14,
//         fontWeight: 'bold',
//     },
//     walletAmount: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#00796b',
//     },
//     title: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     },
//     transactionRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         padding: 8,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0,0,0,0.5)',
//     },
//     modalContent: {
//         backgroundColor: '#fff',
//         padding: 16,
//         borderRadius: 8,
//         width: '80%',
//     },
//     modalTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 4,
//         padding: 8,
//         marginBottom: 16,
//     },
//     errorText: {
//         color: 'red',
//         marginBottom: 16,
//     },
//     modalButtons: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
// });

// export default TransactionList;
import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    Modal,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    Alert,

    ScrollView,
    Image
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Colors } from '@/constants/Colors';
import http_request from '../http_request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import WalletDashboard from './walletDashSection';

const TransactionList = ({ data, RefreshData, wallet, bankDetails, loading, value }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [page, setPage] = useState(1);
    const [selectedTab, setSelectedTab] = useState('all'); // Added state for tabs
    const { control, handleSubmit, formState: { errors } } = useForm();

    const handleWallet = async () => {
        try {
            const resData = {
                serviceCenterId: value?._id,
                serviceCenterName: value?.name,
                contact: +(value?.contact),
                email: value?.email,
                accountHolderName: bankDetails?.accountHolderName,
                bankDetailId: bankDetails?._id,
                ifsc: bankDetails?.IFSC,
                accountNumber: bankDetails?.accountNumber,
            };

            const response = await http_request.post("/addWallet", resData);
            const { data } = response;

            RefreshData(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDuePayment = async (data) => {
        try {
            let centerData = await AsyncStorage.getItem('user');
            let centerInfo = JSON.parse(centerData);

            const serviceCenterPayInfo = {
                account_number: adminBankDtl?.account_number,
                amount: data?.amount * 100,
                currency: "INR",
                mode: "NEFT",
                purpose: "payout",
                fund_account: {
                    account_type: "bank_account",
                    bank_account: {
                        name: bankDetails?.accountHolderName,
                        ifsc: bankDetails?.IFSC,
                        account_number: bankDetails?.accountNumber,
                        bankName: bankDetails?.bankName
                    },
                    contact: {
                        name: centerInfo?.user?.name,
                        email: centerInfo?.user?.email,
                        contact: centerInfo?.user?.contact,
                        type: "employee",
                        reference_id: centerInfo?.user?._id,
                        notes: {
                            notes_key_1: "Tea, Earl Grey, Hot",
                            notes_key_2: "Tea, Earl Grey… decaf.",
                        },
                    },
                },
                queue_if_low_balance: true,
                reference_id: "Acme Transaction ID 12345",
                narration: "Acme Corp Fund Transfer",
                notes: {
                    notes_key_1: "Beam me up Scotty",
                    notes_key_2: "Engage",
                },
            };

            let response = await http_request.post(`/serviceCenterDuePayment`, serviceCenterPayInfo);
            let { data } = response;
            setIsModalOpen(false);
            RefreshData(data);

        } catch (err) {
            console.error(err);
        }
    };

    const onSubmit = (data) => {
        if (bankDetails) {
            handleDuePayment(data);
        } else {
            Alert.alert("Error", "Please add bank details");
        }
    };

    // Tab selection logic
    const filteredData = data?.filter(item => {
        if (selectedTab === 'paid') return item.status === "PAID";
        if (selectedTab === 'unpaid') return item.status === "UNPAID";
        return true; // 'all' tab shows all items
    });

    const itemsPerPage = 5; // Adjust as needed

    const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

    // Sort and Paginate Data
    const paginatedData = filteredData
        ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        ?.map((item, index) => ({ ...item, i: index + 1 }))
        ?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handleNextPage = () => {
        if (page < totalPages) setPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(prev => prev - 1);
    };

    const renderItem = ({ item, index }) => (
        <Card key={index} style={styles.card}>
            <Card.Content>
                {/* Complaint ID & Name */}
                <View style={styles.header}>
                    <Text style={styles.complaintId}>#{item.i} {item?.complaintId}</Text>
                    <Text style={styles.userName}>{item.fullName}</Text>
                </View>

                {/* Details Section */}
                <View style={styles.detailsContainer}>
                    <DetailRow label="Center Name" value={item.serviceCenterName} />
                    <DetailRow label="Description." value={item.description} />
                    <DetailRow
                        label="Address"
                        value={`${item.city}, ${item.address}`}
                        isAddress
                    />
                    <DetailRow label="CreatedAt" value={new Date(item.updatedAt).toLocaleString()} />
                </View>

                {/* Payment Screenshot */}
                <View style={styles.header}>
                    {item.payScreenshot && (
                        <View style={styles.imageContainer}>
                            <Text style={styles.text}>Payment Screenshot</Text>
                            <Image source={{ uri: item.payScreenshot }} style={styles.image} />
                        </View>
                    )}

                    {/* QR Code */}
                    {item.qrCode && (
                        <View style={styles.imageContainer}>
                            <Text style={styles.text}>QR Code</Text>
                            <Image source={{ uri: item.qrCode }} style={styles.image} />
                        </View>
                    )}
                </View>
                {/* Payment Status */}
                <View style={[styles.paymentStatusContainer, item.status === "PAID" ? styles.paid : styles.unpaid]}>
                    <Text style={styles.paymentStatusText}>
                        {item.status === "PAID" ? "Paid" : "Unpaid"}
                    </Text>
                </View>
            </Card.Content>
        </Card>
    );

    // A reusable component for displaying label-value pairs
    const DetailRow = ({ label, value, isAddress = false }) => (
        <View style={[styles.detailRow, isAddress && styles.addressRow]}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={[styles.value, isAddress && styles.addressValue]}>{value}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <WalletDashboard />
            <Text style={styles.title}>Recent Transactions</Text>

            {/* Tabs for Paid, Unpaid, All */}
            <View style={styles.tabs}>
                <TouchableOpacity onPress={() => setSelectedTab('all')} style={[styles.tab, selectedTab === 'all' && styles.selectedTab]}>
                    <Text style={selectedTab === 'all' ? { color: 'white' } : null}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedTab('paid')} style={[styles.tab, selectedTab === 'paid' && styles.selectedTab]}>
                    <Text style={selectedTab === 'paid' ? { color: 'white' } : null}>Paid</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedTab('unpaid')} style={[styles.tab, selectedTab === 'unpaid' && styles.selectedTab]}>
                    <Text style={selectedTab === 'unpaid' ? { color: 'white' } : null}>Unpaid</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <>
                    <ScrollView>
                        <FlatList
                            data={paginatedData}
                            keyExtractor={item => item?._id}
                            renderItem={renderItem}
                        />
                    </ScrollView>

                    {/* Pagination Controls */}
                    <View style={styles.pagination}>
                        <TouchableOpacity onPress={handlePrevPage} disabled={page === 1} style={[styles.button, page === 1 && styles.disabledButton]}>
                            <Text style={styles.buttonText}>Previous</Text>
                        </TouchableOpacity>
                        <Text style={styles.pageText}>
                            Page {page} of {totalPages} ( total records  {filteredData?.length} )
                        </Text>
                        <TouchableOpacity onPress={handleNextPage} disabled={page >= totalPages} style={[styles.button, page >= totalPages && styles.disabledButton]}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom:20
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    tab: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    selectedTab: {
        backgroundColor: '#09090b',
        color: 'white',
    },
    tabText: {
        fontSize: 16,
        color: '#333',
    },
    
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // header: {
    //     flexDirection: 'row',
    //     paddingVertical: 10,
    //     paddingHorizontal: 15,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#ddd',
    //     backgroundColor: '#f8f8f8',
    // },
    text: {
        marginTop: 5, // Adds margin top to the text
        marginBottom: 5, // Adds margin top to the text
    },
    complaintId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    userName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
    },
    detailsContainer: {
        marginVertical: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    value: {
        fontSize: 14,
        fontWeight: '400',
        color: '#333',
        textAlign: 'right',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Aligns the items vertically in the center if needed
        padding: 10,
    },
    imageContainer: {
        marginHorizontal: 10, // Adds space between the image containers
    },
    image: {
        width: 100, // Set the size of the image as required
        height: 100, // Set the size of the image as required
        resizeMode: 'contain',
    },
    paymentStatusContainer: {
        marginVertical: 10,
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
    },
    paid: {
        backgroundColor: 'green',
    },
    unpaid: {
        backgroundColor: 'red',
    },
    paymentStatusText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#f8f8f8',
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'left',
        width: 110,
    },
    card: {
        marginVertical: 8,
        marginLeft: 2,
        borderRadius: 10,
        backgroundColor: "#e2dede",
        elevation: 3,
        //   width:"89%"
    },
    cardUser: {
        marginVertical: 8,
        marginLeft: 2,
        borderRadius: 10,
        backgroundColor: "#e2dede",
        elevation: 3,
        //   width:"57%"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    complaintId: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    userName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
    },
    detailsContainer: {
        //   marginVertical: 8,

    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 4,
    },
    addressRow: {
        alignItems: "flex-start",  // Aligns text to the top for address wrapping
        flexDirection: "column",   // Makes label and value stack vertically
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#666",
        flexShrink: 0,
    },
    value: {
        fontSize: 14,
        fontWeight: "400",
        color: "#333",
        textAlign: "right",
        flexShrink: 1,
    },
    addressValue: {
        textAlign: "left",
        flexWrap: "wrap",   // Allows wrapping
        width: "100%",      // Ensures it takes full width
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    statusText: {
        fontSize: 14,
        fontWeight: "600",
    },
    dateText: {
        fontSize: 12,
        color: "#777",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 10,
    },
    iconButton: {
        padding: 8,
        marginHorizontal: 4,
    },
    feedbackButton: {
        backgroundColor: "#4CAF50",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginLeft: 8,
    },
    feedbackButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },


    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        alignItems: "center",
        borderBottomColor: '#ddd',
    },
    cell: {
        flex: 1,
        textAlign: 'left',
        width: 120,
    },
    statusCell: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: Colors.PRIMARY,
        color: "white",
        paddingTop: 7,
        paddingBottom: 7,
        marginRight: 10,
        borderRadius: 10,
        width: 120,
    },
    actions: {
        flexDirection: 'row',
        width: 100,
        alignItems: 'center',
        justifyContent: "flex-end",
    },
    scrollContainer: {
        flexDirection: 'column',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    pageText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default TransactionList;
