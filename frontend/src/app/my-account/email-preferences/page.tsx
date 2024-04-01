import style from '../style.module.css';
import SideBarUser from "@/components/my-account/sideBarUser";


export default function EmailPreferences() {
    const objectPreferences = [
        {
            "name": 'Real-Time Alerts',
            'device': 'Desktop Notifications',
            'child': [
                {
                    'name': 'Lot Outbid',
                    'description': 'Get notified when you\'ve been outbid.',
                    'status': 0,
                },
                {
                    'name': 'My Saved Item is Coming Up',
                    'description': 'For Live Auctions, you will get notified when your saved item is 5 lots away. For Timed Auctions, you will get notified when your saved item is between 15-30 minutes from closing.',
                    'status': 1,
                },
                {
                    'name': 'My Bid is Coming Up',
                    'description': 'For Live Auctions, you will get notified when your bid is 5 lots away. For Timed Auctions, you will get notified when your bid is between 15-30 minutes from closing.',
                    'status': 0,
                },
                {
                    'name': 'My Registration Status is Updated',
                    'description': 'Get notified when the status of your registration changes, ex. pending registration to approved registration.',
                    'status': 1,
                }
            ]
        },
        {
            "name": 'New Arrival Alerts',
            'device': 'Email',
            'child': [
                {
                    'name': 'Keyword Alerts',
                    'description': 'Be the first to know when items matching your keywords are added.',
                    'status': 1,
                },
                {
                    'name': 'Artist Alerts',
                    'description': 'Be the first to know when items from artists that you follow are added.',
                    'status': 1,
                },
                {
                    'name': 'Category Alerts',
                    'description': 'Get twice weekly notifications when new catalogs matching your categories are added.',
                    'status': 1,
                },
                {
                    'name': 'Seller Alerts',
                    'description': 'Get weekly notifications when sellers you follow add new items.',
                    'status': 1,
                }
            ]
        }
        ,
        {
            "name": 'News & Promotions Alerts',
            'device': 'Desktop Notifications',
            'child': [

                {
                    'name': 'Personalized Emails',
                    'description': 'See personalized item recommendations & sales curated by our editorial team.',
                    'status': 1,
                },

                {
                    'name': '“In Good Taste” Blog Newsletter',
                    'description': 'Read our weekly roundup of buying guides, art market reports, and more stories from our blog.',
                    'status': 0,
                },
                {
                    'name': 'Auction Newsletter',
                    'description': 'Keep up-to-date with a weekly digest of upcoming auctions on Invaluable.',
                    'status': 1,
                },
                {
                    'name': 'Auction Registration Approvals',
                    'description': 'Get notified when auction houses you\'re approved to bid with add new sales.',
                    'status': 1,
                },
                {
                    'name': 'Promotional Emails',
                    'description': 'Receive exclusive sale announcements from premiere auction houses in your favorite categories.',
                    'status': 1,
                }
            ]
        }
    ]

    return (
        <div className='row mx-0'>

            <div className="col-10 px-5">
                {objectPreferences.map((objects, i) => (
                    <div className={style.div_section}>
                        <div className='row border-bottom'>
                            <div className={`${style.div_header_section} col-8`}>
                                {objects.name}
                            </div>
                            <div className={`${style.div_header} col-4`}>
                                {objects.device}
                            </div>
                        </div>
                        {objects.child.map((object, j) => (
                            <div className='row my-4'>
                                <div className={`col-8`}>
                                    <div className={style.div_header}>
                                        {object.name}

                                    </div>
                                    <div>
                                        {object.description}
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className="form-check pt-3">
                                        <input className="form-check-input" type="checkbox" id="flexCheckIndeterminate" defaultChecked={object.status == 1}></input>

                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                ))}
            </div>

            <button type="button" className="btn btn-dark mb-4">Save Changes</button>

        </div >
    );
}