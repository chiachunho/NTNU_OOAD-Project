import React from 'react';
import { Card, Image, Row, Col, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import board from '../images/rules/board.png';
import card_ban1 from '../images/card/card_ban1.png';
import card_ban2 from '../images/card/card_ban2.png';
import card_ban3 from '../images/card/card_ban3.png';
import card_destroy from '../images/card/card_destroy.png';
import card_disban1 from '../images/card/card_disban1.png';
import card_disban2 from '../images/card/card_disban2.png';
import card_disban3 from '../images/card/card_disban3.png';
import card_disban4 from '../images/card/card_disban4.png';
import card_disban5 from '../images/card/card_disban5.png';
import card_disban6 from '../images/card/card_disban6.png';
import card_map from '../images/card/card_map.png';
import card_road0 from '../images/card/card_road0.png';
import card_road2 from '../images/card/card_road2.png';
import card_road3 from '../images/card/card_road3.png';
import card_road7 from '../images/card/card_road7.png';
import card_road9 from '../images/card/card_road9.png';
import card_road12 from '../images/card/card_road12.png';
import card_road17 from '../images/card/card_road17.png';
import card_road18 from '../images/card/card_road18.png';

function Rules() {
    return (
        <>
            <Helmet>
                <title>{'規則解說'}</title>
            </Helmet>
            <h5 className={'pt-3 pb-2 text-center'}>遊戲規則解說</h5>
            <Card className={'mb-3'}>
                <Card.Body>
                    <Card.Title>遊戲起始配置</Card.Title>

                    <Row>
                        <Col xs={12}>
                            <p>
                                根據遊戲人數決定【好矮人】及【壞矮人】的數量，每回合的角色數為遊戲人數 +1
                                ，也就是說大家不會知道這回合實際的【好矮人】及【壞矮人】的數量，因此也有可能會出現整場遊戲全為【好矮人】的情況。
                            </p>
                            <p>自己的身分為隱藏資訊，不可讓他人知道，也是遊戲勝利的關鍵。</p>
                            <Table responsive className={'text-center'} size={'sm'}>
                                <thead>
                                    <tr>
                                        <th>人數</th>
                                        {Array.from({ length: 8 }).map((_, index) => (
                                            <th key={index}>{`${index + 3} 人`}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>好矮人</td>
                                        {Array.from({ length: 8 }).map((_, index) => {
                                            let amount;
                                            switch (index + 3) {
                                                case 3:
                                                    amount = 3;
                                                    break;
                                                case 4:
                                                case 5:
                                                    amount = 4;
                                                    break;
                                                case 6:
                                                case 7:
                                                    amount = 5;
                                                    break;
                                                case 8:
                                                    amount = 6;
                                                    break;
                                                case 9:
                                                case 10:
                                                    amount = 7;
                                                    break;
                                                default:
                                                    amount = 0;
                                            }
                                            return <td key={index}>{`${amount} 個`}</td>;
                                        })}
                                    </tr>
                                    <tr>
                                        <td>壞矮人</td>
                                        {Array.from({ length: 8 }).map((_, index) => {
                                            let amount;
                                            switch (index + 3) {
                                                case 3:
                                                case 4:
                                                    amount = 1;
                                                    break;
                                                case 5:
                                                case 6:
                                                    amount = 2;
                                                    break;
                                                case 7:
                                                case 8:
                                                case 9:
                                                    amount = 3;
                                                    break;
                                                case 10:
                                                    amount = 4;
                                                    break;
                                                default:
                                                    amount = 0;
                                            }
                                            return <td key={index}>{`${amount} 個`}</td>;
                                        })}
                                    </tr>
                                    <tr>
                                        <td>手牌</td>
                                        {Array.from({ length: 8 }).map((_, index) => {
                                            let amount;
                                            switch (index + 3) {
                                                case 3:
                                                case 4:
                                                case 5:
                                                    amount = 6;
                                                    break;
                                                case 6:
                                                case 7:
                                                    amount = 5;
                                                    break;
                                                case 8:
                                                case 9:
                                                case 10:
                                                    amount = 4;
                                                    break;
                                                default:
                                                    amount = 0;
                                            }
                                            return <td key={index}>{`${amount} 張`}</td>;
                                        })}
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className={'mb-3'}>
                <Card.Body>
                    <Card.Title>遊戲流程</Card.Title>
                    <Row>
                        <Col xs={12} md={6} className={'mb-3 mb-md-0 d-flex align-items-center'}>
                            <Image src={board} fluid />
                        </Col>
                        <Col xs={12} md={6} className={'d-flex align-content-center flex-wrap'}>
                            <p>
                                如圖所示，一開始會看到左邊的【起始道路牌】和右邊的三張【終點道路牌】：金礦卡 x1、石頭卡
                                x2。
                            </p>
                            <p>玩家輪流出牌，在以下三種情況中，選擇一種來執行後，會再得到新的手牌：</p>
                            <ul>
                                <li>出一張【一般道路牌】</li>
                                <li>出一張【行動牌】</li>
                                <li>棄一張牌</li>
                            </ul>
                            <p className={'m-0'}>
                                詳細說明可以參考最下方的卡牌規則解說以及
                                <a href={'/tutorial/'}>新手教學</a>。
                            </p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className={'mb-3'}>
                <Card.Body>
                    <Card.Title>遊戲目標</Card.Title>
                    <Row>
                        <Col xs={12}>
                            <p>
                                如果玩家將道路從【起始道路牌】連通至【終點道路牌】，該【終點道路牌】會被翻開供大家查看：
                            </p>
                            <ul>
                                <li>若【終點道路牌】上出現的是石頭，則遊戲尚未結束，繼續進行遊戲。</li>
                                <li>若【終點道路牌】上出現的是金礦，【好矮人】勝利，該回合結束。</li>
                            </ul>
                            <p>回合勝利條件：</p>
                            <ul>
                                <li>好矮人：將【起始道路牌】連接到金礦卡</li>
                                <li>壞矮人：若所有玩家皆沒有手牌可出，且【起始道路牌】尚未連接到金礦卡</li>
                            </ul>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className={'mb-3'}>
                <Card.Body>
                    <Card.Title>回合結束計分</Card.Title>
                    <Row>
                        <Col xs={12}>
                            <p>玩家的分數等同於所有【金塊卡】上的金塊數量加總</p>
                            <p className={'font-weight-bold'}>好矮人獲勝：</p>
                            <p>
                                隨機抽取等同於玩家人數的【金塊卡】（每張金塊卡數量皆不同：1 / 2 /
                                3塊），並依序從最後完成連接道路至金礦的好矮人開始按照出牌順序分發，分發的【金塊卡】由數量最多的【金塊卡】（3塊）發到數量最少的【金塊卡】（1塊）。
                            </p>
                            <p>
                                <small className={'text-muted'}>
                                    若最後完成連接道路至金礦者為壞矮人，一樣只會按照出牌順序分發給好矮人，該壞矮人並不會得到【金塊卡】。
                                </small>
                            </p>
                            <p className={'font-weight-bold'}>壞矮人獲勝：</p>
                            <p>依本次遊戲的壞矮人人數得到相對應的金塊數量：</p>
                            <ul>
                                <li>1 位壞矮人：4 塊。</li>
                                <li>2-3 位壞矮人：3 塊。</li>
                                <li>4 位壞矮人：2 塊。</li>
                            </ul>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className={'mb-3'}>
                <Card.Body>
                    <Card.Title>結束遊戲</Card.Title>
                    <Row>
                        <Col xs={12}>
                            其中一方獲勝並計分後，會開始新回合並重新分配玩家身分，第三回合結束後，分數最高的玩家獲勝。
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <h5 className={'my-3 text-center'}>卡牌規則解說</h5>
            <Card className={'my-3 road-card'}>
                <Card.Header as='h5'>道路牌</Card.Header>
                <Card.Body>
                    <Row className={'row-cols-1 row-cols-md-2 row-cols-lg-3'}>
                        <Col className={'mb-3'}>
                            <Card className={'h-100'}>
                                <Card.Body>
                                    <Card.Title>起始道路牌</Card.Title>
                                    <Row>
                                        <Col xs={3} className={'pr-0'}>
                                            <Image src={card_road0} fluid thumbnail />
                                        </Col>
                                        <Col xs={9} className={'d-flex align-items-center'}>
                                            遊戲開始就會放置於牌面上
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className={'mb-3'}>
                            <Card className={'h-100'}>
                                <Card.Body>
                                    <Card.Title>終點道路牌</Card.Title>
                                    <Row>
                                        <Col xs={3} className={'pr-0 text-center'}>
                                            <Image src={card_road17} fluid thumbnail />
                                            <small className={'text-muted'}>金礦卡x1</small>
                                        </Col>
                                        <Col xs={3} className={'pr-0 text-center'}>
                                            <Image src={card_road18} fluid thumbnail />
                                            <small className={'text-muted'}>石頭卡x2</small>
                                        </Col>
                                        <Col xs={6} className={'d-flex align-items-center'}>
                                            遊戲開始就會以卡牌背面放置於牌面上
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className={'mb-3'}>
                            <Card className={'h-100'}>
                                <Card.Body>
                                    <Card.Title>一般道路牌：手牌</Card.Title>
                                    <Row className={'d-flex justify-content-around'}>
                                        <Col xs={3} className={'pr-0 mr-3'}>
                                            <Image src={card_road3} fluid thumbnail />
                                        </Col>
                                        <Col xs={3} className={'pr-0 mr-3'}>
                                            <Image src={card_road2} fluid thumbnail />
                                        </Col>
                                        <Col xs={3} className={'pr-0 mr-3'}>
                                            <Image src={card_road7} fluid thumbnail />
                                        </Col>
                                    </Row>
                                    <Row className={'mt-2'}>
                                        <Col>
                                            出【一般道路牌】必須符合：
                                            <br />
                                            1. 道路要和道路相接，不可連到石壁
                                            <br />
                                            2. 新加入的【一般道路牌】，路徑要能夠連回到【起始牌】
                                            <br />
                                        </Col>
                                    </Row>
                                    <Row className={'px-3 mt-2 d-flex align-items-center'}>
                                        <Col xs={2} className={'px-0'}>
                                            <Image src={card_road0} fluid thumbnail />
                                        </Col>
                                        <Col xs={2} className={'px-0'}>
                                            <Image src={card_road3} fluid thumbnail />
                                        </Col>
                                        <Col xs={2} className={'px-0'}>
                                            <Image src={card_road12} fluid thumbnail />
                                        </Col>
                                        <Col xs={6} className={'d-flex align-items-center text-muted'}>
                                            <small>正確示範，道路可以連回【起始牌】</small>
                                        </Col>
                                    </Row>
                                    <Row className={'px-3 mt-2 d-flex align-items-center'}>
                                        <Col xs={2} className={'px-0'}>
                                            <Image src={card_road0} fluid thumbnail />
                                        </Col>
                                        <Col xs={2} className={'px-0'}>
                                            <Image src={card_road3} fluid thumbnail />
                                        </Col>
                                        <Col xs={2} className={'px-0'}>
                                            <Image src={card_road9} fluid thumbnail />
                                        </Col>
                                        <Col xs={6} className={'d-flex align-items-center text-muted'}>
                                            <small>錯誤示範，道路不可連到石壁</small>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className={'my-3 action-card'}>
                <Card.Header as='h5'>行動牌</Card.Header>
                <Card.Body>
                    <Row className={'row-cols-1 row-cols-md-2 row-cols-lg-3'}>
                        <Col className={'mb-3'}>
                            <Card className={'h-100'}>
                                <Card.Body>
                                    <Card.Title>破壞牌</Card.Title>
                                    <Row className={'d-flex justify-content-around'}>
                                        <Col xs={3} className={'pr-0 mr-3 text-center'}>
                                            <Image src={card_ban2} fluid thumbnail />
                                            <small className={'text-muted'}>破壞礦燈</small>
                                        </Col>
                                        <Col xs={3} className={'pr-0 mr-3 text-center'}>
                                            <Image src={card_ban1} fluid thumbnail />
                                            <small className={'text-muted'}>破壞礦車</small>
                                        </Col>
                                        <Col xs={3} className={'pr-0 mr-3 text-center'}>
                                            <Image src={card_ban3} fluid thumbnail />
                                            <small className={'text-muted'}>破壞礦鎬</small>
                                        </Col>
                                    </Row>
                                    <Row className={'mt-2'}>
                                        <Col>
                                            對任意一位玩家使用【破壞牌】，該玩家的對應工具就會被破壞，就無法再出【道路牌】，只能選擇出【行動牌】或棄牌
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className={'mb-3'}>
                            <Card className={'h-100'}>
                                <Card.Body>
                                    <Card.Title>修復牌</Card.Title>
                                    <Row className={'d-flex justify-content-around'}>
                                        <Col xs={3} className={'pr-0 mr-3 text-center'}>
                                            <Image src={card_disban2} fluid thumbnail />
                                            <small className={'text-muted'}>修理礦燈</small>
                                        </Col>
                                        <Col xs={3} className={'pr-0 mr-3 text-center'}>
                                            <Image src={card_disban1} fluid thumbnail />
                                            <small className={'text-muted'}>修理礦車</small>
                                        </Col>
                                        <Col xs={3} className={'pr-0 mr-3 text-center'}>
                                            <Image src={card_disban3} fluid thumbnail />
                                            <small className={'text-muted'}>修理礦鎬</small>
                                        </Col>
                                    </Row>
                                    <Row className={'mt-2'}>
                                        <Col>【修復牌】可以將任意玩家的對應工具修復</Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className={'mb-3'}>
                            <Card className={'h-100'}>
                                <Card.Body>
                                    <Card.Title>高級修理牌</Card.Title>
                                    <Row className={'d-flex justify-content-around'}>
                                        <Col xs={3} className={'pr-0 mr-3'}>
                                            <Image src={card_disban4} fluid thumbnail />
                                        </Col>
                                        <Col xs={3} className={'pr-0 mr-3'}>
                                            <Image src={card_disban5} fluid thumbnail />
                                        </Col>
                                        <Col xs={3} className={'pr-0 mr-3'}>
                                            <Image src={card_disban6} fluid thumbnail />
                                        </Col>
                                    </Row>
                                    <Row className={'mt-2'}>
                                        <Col>
                                            卡牌上一次有兩種符號，代表可以修理符合的破壞工具，但是
                                            <strong>一次只能修理一個被破壞的工具</strong>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className={'mb-3'}>
                            <Card className={'h-100'}>
                                <Card.Body>
                                    <Card.Title>落石牌</Card.Title>
                                    <Row>
                                        <Col xs={3} className={'pr-0'}>
                                            <Image src={card_destroy} fluid thumbnail />
                                        </Col>
                                        <Col xs={9} className={'d-flex align-items-center'}>
                                            打出此牌，可以將牌面上一張已經擺好的【道路牌】移出到棄牌堆
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className={'mb-3'}>
                            <Card className={'h-100'}>
                                <Card.Body>
                                    <Card.Title>地圖牌</Card.Title>
                                    <Row>
                                        <Col xs={3} className={'pr-0'}>
                                            <Image src={card_map} fluid thumbnail />
                                        </Col>
                                        <Col xs={9} className={'d-flex align-items-center'}>
                                            打出此牌，秘密地看一張【終點道路牌】的正面為金礦或者石頭
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}

export default Rules;
